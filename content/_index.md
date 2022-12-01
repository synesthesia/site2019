---
# Leave the homepage title empty to use the site title
title: 
date: 2022-10-24
type: landing

sections:
  - block: about.avatar
    id: about
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: synesthesia
      # Override your bio text from `authors/admin/_index.md`?
      text:

  - block: experience
    content:
      title: Recent Experience
      # Date format for experience
      #   Refer to https://wowchemy.com/docs/customization/#date-format
      date_format: Jan 2006
      # Experiences.
      #   Add/remove as many `experience` items below as you like.
      #   Required fields are `title`, `company`, and `date_start`.
      #   Leave `date_end` empty if it's your current employer.
      #   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
      items:
        - title: Director of Information Services
          company: SSAT the schools teachers and students network
          company_url: 'https://www.ssatuk.co.uk'
          #company_logo: org-gc
          location: London
          date_start: '2012-06-01'
          date_end: ''
          description: |2-
              Responsibilities include:

              * Technology strategy
              * Business process change
              * Application development
              * Technology support
              * Data protection
        - title: Board Member
          company: Islington and Shoreditch Housing Association
          company_url: 'https://www.isha.co.uk/'
          #company_logo: org-x
          location: London
          date_start: '2011-09-01'
          date_end: '2019-11-06'
          description: |2-
            As a non-executive Member of the association I served on the Board:
            
            * setting the strategic direction of the Association, 
            * approving budgets and treasury provision
            * monitoring performance
            * ensuring adherence to standards
    design:
      columns: '2'

  - block: collection
    id: posts
    content:
      title: Recent Posts
      subtitle: ''
      text: ''
      # Choose how many pages you would like to display (0 = all pages)
      count: 5
      # Filter on criteria
      filters:
        folders:
        - post
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Choose how many pages you would like to offset by
      offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      order: desc
    design:
    # Choose a layout view
      view: list
      columns: '2'

  - block: collection
    id: notes
    content:
      title: Working Notes
      subtitle: 'Technical aides memoir'
      archive:
        text: See all notes
      text: ''
      # Choose how many pages you would like to display (0 = all pages)
      count: 5
      # Filter on criteria
      filters:
        folders:
        - note
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Choose how many pages you would like to offset by
      offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      order: desc
    design:
    # Choose a layout view
      view: list
      columns: '2'

  - block: portfolio
    id: projects
    content:
      title: Projects
      subtitle: Collections of posts around a theme
      filters:
        folders:
          - project
      # Default filter index (e.g. 0 corresponds to the first `filter_button` instance below).
      default_button_index: 0
      # Filter toolbar (optional).
      # Add or remove as many filters (`filter_button` instances) as you like.
      # To show all items, set `tag` to "*".
      # To filter by a specific tag, set `tag` to an existing tag name.
      # To remove the toolbar, delete the entire `filter_button` block.
      buttons:
        - name: All
          tag: '*'
      
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '2'
      view: showcase
      # For Showcase view, flip alternate rows?
      flip_alt_rows: false

  - block: tag_cloud
    id: tags
    content:
      title: Tags
    design:
      columns: '2'

  - block: contact
    id: contact
    content:
      title: Contact
      subtitle:
      #text: |-
      #  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi diam, venenatis ut magna et, vehicula efficitur enim.
      # Contact (add or remove contact options as necessary)
      email: 'julianelve@pm.me'
      #phone: 888 888 88 88
      #appointment_url: 'https://calendly.com'
      #address:
      #  street: 450 Serra Mall
      #  city: Stanford
      #  region: CA
      #  postcode: '94305'
      #  country: United States
      #  country_code: US
      #directions: Enter Building 1 and take the stairs to Office 200 on Floor 2
      #office_hours:
      #  - 'Monday 10:00 to 13:00'
      #  - 'Wednesday 09:00 to 10:00'
      contact_links:
        - icon: mastodon
          icon_pack: fab
          name: Mastodon
          link: https://social.synesthesia.co.uk/@julian 
        - icon: keybase
          icon_pack: fab
          name: keybase.io/synesthesiauk
          link: https://keybase.io/synesthesiauk
        - icon: telegram
          icon_pack: fab
          name: Telegram Me
          link: 'https://telegram.me/julianelve'
      # Automatically link email and phone or display as text?
      autolink: true
      # Email form provider
      #form:
      #  provider: netlify
      #  formspree:
      #    id:
      #  netlify:
      #    # Enable CAPTCHA challenge to reduce spam?
      #    captcha: true
    design:
      columns: '2'

---
