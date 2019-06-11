---
title: Problem with OpenOffice and Ruby
author: Julian
type: post
date: 2005-03-25T08:13:38+00:00
excerpt: OpenOffice OLE Bridge produces error when trying to set properties from Ruby
slug: problem-with-openoffice-and-ruby 
aliases: ["/2005/03/25/problem-with-openoffice-and-ruby"]
ttaglist:
  - OpenOffice, Scripting, Ruby

---
I&#8217;ve been trying to automate [OpenOffice][1] from [Ruby][2] to carry out a batch format conversion of approximately 100 documents. I&#8217;ve researched a fair amount on the web, especially [here][3], [here][4] and [here][5], but I&#8217;m still having problems.

Specifically all works until I try and save a document using parameters (to tell OpenOffice to use an output filter), at which point the OLE Bridge is giving an error. 

If anyone reading this has found and cured a similar problem I&#8217;d be interested in your thoughts. Code snip follows:
  
<!--more-->


  
Ignore the escaping of the &#8221; signs &#8211; this seems to be some oddity of my WordPress installation&#8230;

<pre># oo tests

require 'win32ole'

$serviceManager = WIN32OLE.new("com.sun.star.ServiceManager")
$desktop = $serviceManager.createInstance("com.sun.star.frame.Desktop")

def newWriterDocument()
    document = $desktop.loadComponentFromURL("private:factory/swriter", "_blank", 0, [])
   document
end

def test()
   filter = "writer_pdf_Export"
   fprops = makeProperties("FilterName" => filter)
   document = newWriterDocument
   text = document.GetText
   cursor = text.createTextCursor
   text.insertString(cursor, "Hello World", 0)
   oURL = "file:///c|/test.pdf"
   document.storeAsUrl(oURL, fprops) # this line fails with OLE error
   #store a document in standard format - document.storeAsUrl(oURL, []) - works
end



def makeProperty(name, value)
   property = $serviceManager.Bridge_GetStruct("com.sun.star.beans.PropertyValue")
   property["Name"] = name
   property["Value"] = value
   property
end
   
def makeProperties(hash)
   properties = []
   hash.each { | key, value |
   properties &lt; &lt; makeProperty(key, value)
     }
   properties
end

begin
  test
rescue

ensure

end
</pre>

<ins datetime="2005-03-29T19:00:46-01:00">Question also <a href="https://www.oooforum.org/forum/viewtopic.phtml?t=18607">posted</a> to OpenOffice.org forum.</ins>

<ins datetime="2005-03-29T22:16:16-01:00">OpenOffice.org forum came up with the answer:<br /> Replace </p> 


  <pre>document.storeAsUrl(oURL, fprops) # this line fails with OLE error</pre>



  <p>
    with
  </p>



  <pre>document.storeToUrl(oURL, fprops) # this line works!</pre>



  <p>
    </ins>
  </p>

 [1]: https://www.openoffice.org/
 [2]: https://www.ruby-lang.org/
 [3]: https://www.rubygarden.org/ruby/ruby?OpenOffice
 [4]: https://www.oooforum.org/forum/viewtopic.phtml?t=3510
 [5]: https://www.oooforum.org/forum/viewtopic.phtml?t=9815