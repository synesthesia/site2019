---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Transcribing meeting recordings with OpenAI"
subtitle: ""
summary: "Using a little bit of Python to transcribe a meeting recording with OpenAI"
authors: ["synesthesia"]
categories: []
tags: ["python", "OpenAI"]
lastmod: 2024-10-09T14:23:23+01:00
featured: false
draft: false
type: note
url_code: "https://gist.github.com/synesthesia/fe6bf9a3d3e758981f6c9410a709e265"

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---
The other day I was sent an audio recording of a meeting I had been part of, but no textual transcript was available.

With a relatively small amount of hacking it is now very easy to use the [OpenAI Whisper](https://openai.com/index/whisper/) model via the [transcriptions endpoint](https://platform.openai.com/docs/guides/speech-to-text) to generate high quality text from such a file.

This example uses Python, it's a great language for these sort of ad-hoc tools.


## Process 

The process breaks down into three logical parts:

- install all dependencies
- prepare the audio file (in this case, splitting it to ensure we kept within the 25MB filesize limits of whisper)
- run the prepared files via OpenAI and reassemble a single text file

### Environment and Dependencies

Because the source was in m4a format, it was necessary to install FFMPEG on my machine. 

The suggested methods are:

- Windows `winget install ffmpeg`
- MacOS `brew install ffmpeg`
- Linux `sudo apt-get install ffmpeg`

I then needed a Python environment with the key dependencies added.

I mainly use conda to manage environments, so I set up a new environment like this:

```shell
conda create -n myenv python=3.12 
conda install -n myenv openai
conda install -n myenv -c conda-forge pydub
conda activate myenv
```

last preparation step was to create an API key in my OpenAI account, and add that into the environment variables for my new conda environment:

```shell
conda env config vars set OPENAI_API_KEY=VALUE_OF_MY_KEY
```


### Splitting the audio

The meeting was over an hour long, so to split the audio into smaller chunks I used [this script](https://gist.github.com/synesthesia/fe6bf9a3d3e758981f6c9410a709e265#file-split-py), making use of the [pydub](https://github.com/jiaaro/pydub) library:

```python
"""
This module splits an audio file into multiple segments based on maximum segment length

The default maximum segment length is 15 minutes.

Output format is m4a

Usage: `python split.py <path_to_audio_file>`

Your environment must meet the following requirements:
  - pydub Python package installed
  - FFMPEG installed on your platform in the path
    - Windows `winget install ffmpeg`
    - MacOS `brew install ffmpeg`
    - Linux `sudo apt-get install ffmpeg`
"""
 
import sys
import os
from pydub import AudioSegment
import math

def split_audio(file_path, segment_length=15*60*1000):  # 15 minutes in milliseconds
    # Load the audio file
    audio = AudioSegment.from_file(file_path)
    
    # Get the total length of the audio file
    total_length = len(audio)
    
    # Calculate the number of segments needed
    num_segments = math.ceil(total_length / segment_length)

    # Loop through and create each segment
    for i in range(num_segments):
        start_time = i * segment_length
        end_time = min((i + 1) * segment_length, total_length)  # Ensure the last segment does not exceed total length
        segment = audio[start_time:end_time]

        # Generate the output file name
        output_file = f"{file_path[:-4]}_part{i+1}.m4a"
        
        # Export the segment as an m4a file
        segment.export(output_file, format="ipod") # see https://github.com/jiaaro/pydub/issues/755
        print(f"Exported: {output_file}")


source_path = os.path.abspath(sys.argv[1]) 
split_audio(source_path)
```

### Speech to text

The [second script](https://gist.github.com/synesthesia/fe6bf9a3d3e758981f6c9410a709e265#file-transcribe-py) takes a wildcard list of audio files and runs them through the OpenAI transcribe endpoint using the [official Python library for the openai API](https://pypi.org/project/openai/).

The results are saved to text files, then all the text files concatenated into one output.

```python
"""
This module reads audio files and transcribes them using OpenAI's API.

Usage:  python transcribe <input_wildcard>

Where input_wildcard is a wildcard pattern that matches the audio files to be transcribed.

For example if the audio files are named "test/audio1.m4a", "test/audio2.m4a", etc., 
    you can use the wildcard "test/audio*.m4a" to transcribe all the files.
    
Each transcription is saved to a text file with the same name as the audio file, but 
with a .txt extension.

All the text files are then combined into a single output file named "output_file.txt".
    
Your environment must meet the following requirements:
  - OpenAI Python package installed
  - set OPENAI_API_KEY environment variable to your OpenAI API key
  

"""
import os
import sys
import glob
import shutil
from openai import OpenAI

client = OpenAI()

input_wildcard = sys.argv[1]
input_files = glob.glob(input_wildcard)
print(f"Transcribing from{input_files}")
output_files = []

for x in input_files:
    audio_file= open(x, "rb")
    print("Transcribing file " + x)
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        response_format="text",
        language="en"
    )
    output_file = f"{x[:-4]}.txt"
    output_files.append(output_file)
    with open(output_file, "a", encoding="utf-8") as f:
        print(transcription, file=f)
        print(f"Transcription written to: {output_file}")

print(f"Outputs are {output_files}")
concat_file = os.path.dirname(output_files[0]) + "/output_file.txt"

with open(concat_file,'wb') as wfd:
    for f in output_files:
        with open(f,'rb') as fd:
            shutil.copyfileobj(fd, wfd)
```

## Results

Because we are generating the text from a simple audio file, the transcription has no way of associating speech with different speakers - if you can get an AI transcription generated by the online meeting platform from the meeting organisers then that is always going to be better.

On the first trial, one of the output files started with several paragraphs of English speech transcribed as Welsh. On investigation, the relevant audio file started with a long contribution from two people who were sharing a laptop mic in a "boomy" office - my guess is that having this poor audio at the start of the clip confused the algorithm.

Changing the split boundaries to avoid this seemed to cure the problem.
