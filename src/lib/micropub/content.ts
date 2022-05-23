
import matter from 'gray-matter'
import { utils } from './utils'
import {postType} from './postType'

const renameProperties = {
	'name': 'title',
	'category': 'tags'
}

const ignoreProperties = [
	'content', 'photo'
]



const content = {
	output: data => {
		if (!data) {
			return null
		}

		const output = {}
		for ( const [key, value] of Object.entries(data)) {
			if (!ignoreProperties.includes(key)) {
				output[renameProperties[key] || key] = value
			}
		}

		return matter.stringify(data.content || '', output)
	},

	format: data => {
		if (!data) {
			return null
		}
		const date : Date = new Date()
		if (!data.date) {
			data.date = date.toISOString()
		} else {
			data.updated = date.toISOString()
		}
		const type:postType = content.getType(data)

        data.type   = type.type
        data.sub_type = type.subType

		const slugParts = []
		if (process.env.FILENAME_FULL_DATE) { // Jekyll post filenames must have YYYY-MM-DD in the filename
			slugParts.push(date.toISOString().substr(0, 10)) // or split('T')[0]
		}
		if (data.slug) {
			slugParts.push(utils.slugify(data.slug))
		} else if (data.name) {
			slugParts.push(utils.slugify(data.name))
		} else {
			slugParts.push(Math.round(date.getTime() / 1000))
		}
		const slug = slugParts.join('-')
		const dir = (process.env.CONTENT_DIR || 'src').replace(/\/$/, '')
		const filename = `${dir}/${type.type}/${slug}.md`

		return {
			'filename': filename,
			'slug': `${type.type}/${slug}`,
			'formatted': content.output(data),
			'data': data
		}
	},

	getType : (data):postType =>  {
		if (!utils.objectHasKeys(data)) {
			return null
		}
		if (data['like-of']) {
			return {type: 'stream', subType: 'like'}
		}
		if (data['bookmark_of']) {
			return {type: 'stream', subType: 'bookmark'}
		}
		if (data['in-reply-to']) {
			return {type: 'stream', subType: 'reply'}
		}
		if (data['name']) {
			return {type: 'post', subType: null}
		}
		return {type: 'stream', subType: 'note'}
	},

	mediaFilename: file => {
		if (file && file.filename) {
			const dir = (process.env.MEDIA_DIR || 'uploads').replace(/\/$/, '')
            const date = new Date()
			return `${dir}/${Math.round(date.getTime() / 1000)}_${file.filename}`
		}
	}
}

export default content
