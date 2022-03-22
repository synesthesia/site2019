
import content from '../src/lib/micropub/content'
import {postType} from '../src/lib/micropub/postType'

describe('content', () => {
	const likedURL = 'https://domain.tld'

	let data

	const output = '---\n' +
	'date: \'2021-09-09T12:23:34.120Z\'\n' +
	'title: Title\n' +
	'tags:\n' +
	'  - one\n' +
	'  - two\n' +
	'  - three\n' +
	'updated: \'2021-10-09T12:23:34.120Z\'\n' +
	'---\n' +
	'This is the content\n'

	beforeEach(() => {
		data = {
			'date': '2021-09-09T12:23:34.120Z',
			'name': 'Title',
			'category': [ 'one', 'two', 'three' ],
			'updated': '2021-10-09T12:23:34.120Z',
			'content': 'This is the content'
		}
	})

	describe('output', () => {
		test('standard post', () => {
			const fm = content.output(data)
			expect(fm).toBe(output)
		})

		test('deleted post', () => {
			data.deleted = true
			const fm = content.output(data)
			expect(fm).toContain('\ndeleted: true\n')
		})

		test('draft article', () => {
			data.draft = true
			const fm = content.output(data)
			expect(fm).toContain('\ndraft: true\n')
		})

		test('no tags', () => {
			delete data.category
			const fm = content.output(data)
			expect(fm).not.toContain('\ntags:')
		})

		test('like post', () => {
			data['like-of'] = likedURL
			const fm = content.output(data)
			expect(fm).toContain('\nlike-of:')
		})

		test('bookmark post', () => {
			data['bookmark_of'] = likedURL
			const fm = content.output(data)
			expect(fm).toContain('\nbookmark_of:')
		})

		test('reply post', () => {
			data['in-reply-to'] = likedURL
			const fm = content.output(data)
			expect(fm).toContain('\nin-reply-to:')
		})

		test('null data', () => {
			const fm = content.output()
			expect(fm).toBeFalsy()
		})
	})

	describe('format', () => {
		test('set create date', () => {
			delete data.date
			delete data.updated
			const formatted = content.format(data)
			expect(formatted.data).toHaveProperty('date')
		})

		test('set updated date', () => {
			delete data.updated
			const formatted = content.format(data)
			expect(formatted.data).toHaveProperty('updated')
		})

		test('change updated date', () => {
			const updated = '2021-10-09T12:23:34.120Z'
			data.updated = updated
			const formatted = content.format(data)
			expect(formatted.data.updated).not.toBe(updated)
		})

		test('is article', () => {
			const formatted = content.format(data)
			expect(formatted).toHaveProperty('slug')
			expect(formatted.slug).toMatch(/^post\/.*/)
			expect(formatted).toHaveProperty('filename')
			expect(formatted.filename).toMatch(/^src\/post\/.*/)
			expect(formatted.filename).toBe(`src/${formatted.slug}.md`)
            expect(formatted.data).toHaveProperty('type')
            expect(formatted.data.type).toMatch(/^post/)
		})

		test('is note', () => {
			delete data.name
			const formatted = content.format(data)
			expect(formatted).toHaveProperty('slug')
			expect(formatted.slug).toMatch(/^stream\/.*/)
			expect(formatted).toHaveProperty('filename')
			expect(formatted.filename).toMatch(/^src\/stream\/.*/)
			expect(formatted.filename).toBe(`src/${formatted.slug}.md`)
            expect(formatted.data).toHaveProperty('type')
            expect(formatted.data.type).toMatch(/^stream/)
            expect(formatted.data).toHaveProperty('sub_type')
            expect(formatted.data.sub_type).toMatch(/^note/)
		})

        test('is bookmark', () => {
			delete data.name
            data['bookmark_of'] = likedURL
			const formatted = content.format(data)
			expect(formatted).toHaveProperty('slug')
			expect(formatted.slug).toMatch(/^stream\/.*/)
			expect(formatted).toHaveProperty('filename')
			expect(formatted.filename).toMatch(/^src\/stream\/.*/)
			expect(formatted.filename).toBe(`src/${formatted.slug}.md`)
            expect(formatted.data).toHaveProperty('type')
            expect(formatted.data.type).toMatch(/^stream/)
            expect(formatted.data).toHaveProperty('sub_type')
            expect(formatted.data.sub_type).toMatch(/^bookmark/)
		})

        test('is reply', () => {
			delete data.name
            data['in-reply-to'] = likedURL
			const formatted = content.format(data)
			expect(formatted).toHaveProperty('slug')
			expect(formatted.slug).toMatch(/^stream\/.*/)
			expect(formatted).toHaveProperty('filename')
			expect(formatted.filename).toMatch(/^src\/stream\/.*/)
			expect(formatted.filename).toBe(`src/${formatted.slug}.md`)
            expect(formatted.data).toHaveProperty('type')
            expect(formatted.data.type).toMatch(/^stream/)
            expect(formatted.data).toHaveProperty('sub_type')
            expect(formatted.data.sub_type).toMatch(/^reply/)
		})

        test('is like', () => {
			delete data.name
            data['like-of'] = likedURL
			const formatted = content.format(data)
			expect(formatted).toHaveProperty('slug')
			expect(formatted.slug).toMatch(/^stream\/.*/)
			expect(formatted).toHaveProperty('filename')
			expect(formatted.filename).toMatch(/^src\/stream\/.*/)
			expect(formatted.filename).toBe(`src/${formatted.slug}.md`)
            expect(formatted.data).toHaveProperty('type')
            expect(formatted.data.type).toMatch(/^stream/)
            expect(formatted.data).toHaveProperty('sub_type')
            expect(formatted.data.sub_type).toMatch(/^like/)
		})

	})

	describe('mediaFilename', () => {
		const file = {
			filename: 'image.png'
		}
		test('valid image', () => {
			const filename = content.mediaFilename(file)
			expect(filename).toMatch(/^uploads\//)
			expect(filename).toMatch(`_${file.filename}`)
		})

		test('invalid image', () => {
			const filename = content.mediaFilename({})
			expect(filename).toBeFalsy()
		})
	})

	describe('getType', () => {
		test('is like', () => {
			expect(content.getType({ 'like-of': likedURL })).toBe<postType>({type: 'stream', subType: 'like'})
		})

		test('is bookmark', () => {
			expect(content.getType({ 'bookmark_of': likedURL })).toBe<postType>({type: 'stream', subType: 'bookmark'})
		})

		test('is reply', () => {
			data['in-reply-to'] = likedURL
			expect(content.getType(data)).toBe<postType>({type: 'stream', subType: 'reply'}
            )
		})

		test('is article', () => {
			expect(content.getType({ 'name': 'hello' })).toBe<postType>({type: 'post', subType: null})
		})

		test('is note', () => {
			expect(content.getType()).not.toBe('notes')
			expect(content.getType({})).not.toBe('notes')
		})
	})
})
