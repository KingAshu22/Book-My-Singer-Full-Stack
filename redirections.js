const redirections = [
  {
    oldUrl: '/book-male-singers',
    newUrl: '/artist-category/singers/male-singers'
  },
  {
    oldUrl: '/hire-female-singers',
    newUrl: '/artist-category/singers/female-singers'
  },
  {
    oldUrl: '/book-punjabi-singers',
    newUrl: '/artist-category/singers/punjabi-singers'
  },
  {
    oldUrl: '/book-tamil-singers',
    newUrl: '/artist-category/singers/tamil-singer'
  },
  {
    oldUrl: '/book-bengali-singers',
    newUrl: '/artist-category/singers/bengali-singers'
  },
  {
    oldUrl: '/book-telugu-singers',
    newUrl: '/artist-category/singers/telugu-singers'
  },
  {
    oldUrl: '/book-gujarati-singers',
    newUrl: '/artist-category/singers/gujurati-singers'
  },
  {
    oldUrl: '/book-marathi-singers',
    newUrl: '/artist-category/singers/marathi-singers'
  },
  {
    oldUrl: '/book-malayalam-singers',
    newUrl: '/artist-category/singers/malayalam-singers'
  },
  {
    oldUrl: '/book-kannada-singers',
    newUrl: '/artist-category/singers/kannada-singers'
  },
  {
    oldUrl: '/book-carnatic-singers',
    newUrl: '/artist-category/singers/carnatic-singers'
  },
  {
    oldUrl: '/book-odia-singers',
    newUrl: '/artist-category/singers/odia-singers'
  },
  {
    oldUrl: '/book-konkani-singers',
    newUrl: '/artist-category/singers/konkani-singers'
  },
  {
    oldUrl: '/book-assamese-singers',
    newUrl: '/artist-category/singers/assamese-singers'
  },
  {
    oldUrl: '/book-sindhi-singers',
    newUrl: '/artist-category/singers/sindhi-singers'
  },
  {
    oldUrl: '/book-bhojpuri-singers',
    newUrl: '/artist-category/singers/bhojpuri-singers'
  },
  {
    oldUrl: '/book-nepali-singers',
    newUrl: '/artist-category/singers/nepali-singers'
  },
  {
    oldUrl: '/book-rajasthani-marwadi-singers',
    newUrl: '/artist-category/singers/rajasthani-marwadi-singers'
  },
  {
    oldUrl: '/hire-bollywood-singer',
    newUrl: '/artist-category/singers/bollywood-singers'
  },
  {
    oldUrl: '/book-sufi-singers',
    newUrl: '/artist-category/singers/sufi-singers'
  },
  {
    oldUrl: '/book-hindi-singers',
    newUrl: '/artist-category/singers/hindi-singers'
  },
  {
    oldUrl: '/book-bhajan-singers',
    newUrl: '/artist-category/singers/bhajan-singers'
  },
  {
    oldUrl: '/book-ghazal-singers',
    newUrl: '/artist-category/singers/ghazal-singers'
  },
  {
    oldUrl: '/book-female-ghazal-singer',
    newUrl: '/artist-category/singers/female-ghazal-singers'
  },
  {
    oldUrl: '/book-indian-classical-singers',
    newUrl: '/artist-category/singers/indian-classical-singers'
  },
  {
    oldUrl: '/book-folk-singers',
    newUrl: '/artist-category/singers/folk-singers'
  },
  {
    oldUrl: '/book-qawwali-singers',
    newUrl: '/artist-category/singers/qawwali-singers'
  },
  {
    oldUrl: '/book-pop-singers',
    newUrl: '/artist-category/singers/pop-singers'
  },
  {
    oldUrl: '/book-lavani-singers',
    newUrl: '/artist-category/singers/lavani-singers'
  },
  {
    oldUrl: '/book-indie-singers',
    newUrl: '/artist-category/singers/indie-singers'
  },
  {
    oldUrl: '/book-english-western-singers-for-events',
    newUrl: '/artist-category/singers/english-western-singers'
  },
  {
    oldUrl: '/book-indie-live-bands',
    newUrl: '/artist-category/live-bands/indie-live-bands'
  },
  {
    oldUrl: '/book-dj-based-live-bands',
    newUrl: '/artist-category/live-bands/dj-based-live-bands'
  },
  {
    oldUrl: '/realty-tv-shows-singers',
    newUrl: '/artist-category/singers/reality-tv-shows-singers'
  },
  {
    oldUrl: '/book-indian-idol-singers',
    newUrl: '/artist-category/singers/indian-idol-singers'
  },
  {
    oldUrl: '/hire-sa-re-ga-ma-pa-singers',
    newUrl: '/artist-category/singers/-sa-re-ga-ma-pa-singers'
  },
  {
    oldUrl: '/book-indian-idol-singer',
    newUrl: '/artist-category/singers/indian-idol-singers'
  },
  {
    oldUrl: '/book-the-voice-india-singers',
    newUrl: '/artist-category/singers/the-voice-india-singers'
  },
  {
    oldUrl: '/book-rising-star-singers',
    newUrl: '/artist-category/singers/rising-star-singers'
  },
  {
    oldUrl: '/book-super-singer',
    newUrl: '/artist-category/singers/super-singer'
  },
  {
    oldUrl: '/book-dil-hai-hindustani-singers',
    newUrl: '/artist-category/singers/dil-hai-hindustani-singers'
  },
  {
    oldUrl: '/book-saregamapa-lil-champs-singers',
    newUrl: '/artist-category/singers/saregamapa-lil-champs-singers'
  },
  {
    oldUrl: '/book-mtv-unplugged-singers',
    newUrl: '/artist-category/singers/mtv-unplugged-singers'
  },
  {
    oldUrl: '/book-sur-kshetra-singers',
    newUrl: '/artist-category/singers/sur-kshetra-singers'
  },
  {
    oldUrl: '/book-fame-gurukul-singers',
    newUrl: '/artist-category/singers/fame-gurukul-singers'
  },
  {
    oldUrl: '/book-female-band',
    newUrl: '/artist-category/live-bands/female-live-bands'
  },
  {
    oldUrl: '/book-punjabi-live-band',
    newUrl: '/artist-category/live-bands/punjabi-live-bands'
  },
  {
    oldUrl: '/book-bhajan-live-band',
    newUrl: '/artist-category/live-bands/bhajan-live-bands'
  },
  {
    oldUrl: '/live-bands-for-mayra',
    newUrl: '/artist-category/live-bands/live-bands-for-mayra-bhaat'
  },
  {
    oldUrl: '/book-flute-player',
    newUrl: '/artist-category/musicians/flute-player'
  },
  {
    oldUrl: '/book-grand-piano',
    newUrl: '/artist-category/musicians/grand-piano'
  },
  {
    oldUrl: '/book-sitar-player',
    newUrl: '/artist-category/musicians/sitar-player'
  },
  {
    oldUrl: '/book-jaltarang-player',
    newUrl: '/artist-category/musicians/jaltarang-player'
  },
  {
    oldUrl: '/book-saxophone-player',
    newUrl: '/artist-category/musicians/saxophone-player'
  },
  {
    oldUrl: '/book-tabla-player',
    newUrl: '/artist-category/musicians/tabla-player'
  },
  {
    oldUrl: '/book-violin-player',
    newUrl: '/artist-category/musicians/violin-player'
  },
  {
    oldUrl: '/book-senhai-player-2',
    newUrl: '/artist-category/musicians/senhai-player'
  },
  {
    oldUrl: '/book-bollywood-dj-player',
    newUrl: '/artist-category/dj/bollywood-dj-player'
  },
  {
    oldUrl: '/book-english-dj',
    newUrl: '/artist-category/singers/english-dj-player'
  },
  {
    oldUrl: '/live-singer-for-wedding',
    newUrl: '/artist-category/singers/singer-for-wedding'
  },
  {
    oldUrl: '/book-dj-with-percussion',
    newUrl: '/artist-category/dj/dj-with-percussion'
  },
  {
    oldUrl: '/book-comedian',
    newUrl: '/artist-category/comedians/comedian'
  },
  {
    oldUrl: '/book-magician',
    newUrl: '/artist-category/magician/magician'
  },
  { oldUrl: '/book-dancer', newUrl: '/artist-category/dancer/dancer' },
  {
    oldUrl: '/book-choreographer',
    newUrl: '/artist-category/choreographer/choreographer'
  },
  {
    oldUrl: '/book-photographer',
    newUrl: '/artist-category/photographer/photographer'
  },
  {
    oldUrl: '/book-live-bands-for-events',
    newUrl: '/blog/book-live-bands-for-events'
  },
  {
    oldUrl: '/book-sufi-live-bands-for-events',
    newUrl: '/blog/book-sufi-live-bands-for-events'
  },
  {
    oldUrl: '/book-sindhi-live-bands-for-events',
    newUrl: '/blog/book-sindhi-live-bands-for-events'
  },
  {
    oldUrl: '/book-rajasthani-marwari-live-band',
    newUrl: '/blog/book-rajasthani-marwari-live-band'
  },
  {
    oldUrl: '/book-english-western-live-band-for-an-event',
    newUrl: '/blog/book-english-western-live-band-for-an-event'
  },
  {
    oldUrl: '/book-celebrity-singers-for-your-event',
    newUrl: '/blog/book-celebrity-singers-for-your-event'
  },
  {
    oldUrl: '/hire-ghazal-live-bands',
    newUrl: '/blog/hire-ghazal-live-bands-for-your-event'
  },
  {
    oldUrl: '/hire-playback-singer',
    newUrl: '/blog/hire-playback-singer'
  },
  {
    oldUrl: '/hire-bollywood-male-singers',
    newUrl: '/blog/hire-bollywood-male-singers'
  },
  {
    oldUrl: '/hire-bollywood-female-singers',
    newUrl: '/blog/hire-bollywood-female-singers'
  },
  {
    oldUrl: '/book-playback-male-singer',
    newUrl: '/blog/book-male-playback-singer'
  },
  {
    oldUrl: '/hire-playback-female-singer',
    newUrl: '/blog/book-female-playback-singer'
  },
  {
    oldUrl: '/book-instrumentalists-musicians-for-your-events',
    newUrl: '/blog/book-instrumentalists-musicians-for-your-events'
  },
  {
    oldUrl: '/hire-sarangi-player-for-your-event',
    newUrl: '/blog/hire-a-sarangi-player-for-your-event'
  },
  {
    oldUrl: '/book-female-singer-for-wedding',
    newUrl: '/blog/book-female-singer-for-wedding-'
  },
  {
    oldUrl: '/female-singer-for-wedding-mehndi',
    newUrl: '/blog/female-singer-for-wedding-mehendi'
  },
  {
    oldUrl: '/wedding-female-singers',
    newUrl: '/blog/wedding-female-singers'
  },
  {
    oldUrl: '/live-singers-and-bands-for-wedding-sangeet',
    newUrl: '/blog/live-bands-and-singers-for-wedding-sangeet'
  },
  {
    oldUrl: '/live-singers-and-bands-for-wedding-reception',
    newUrl: '/blog/book-live-singers-and-bands-for-wedding-reception'
  },
  {
    oldUrl: '/live-singers-and-bands-for-wedding-haldi',
    newUrl: '/blog/live-singer-and-bands-for-wedding-haldi-ceremony'
  },
  {
    oldUrl: '/live-singers-and-bands-for-wedding-mehndi',
    newUrl: '/blog/live-singer-bands-for-wedding-mehandi-ceremony'
  },
  {
    oldUrl: '/live-singers-and-bands-for-wedding-roka',
    newUrl: '/blog/live-singer-bands-for-roka-ceremony'
  },
  {
    oldUrl: '/live-singers-and-bands-for-wedding-engagement',
    newUrl: '/blog/live-singer-bands-for-engagement-ceremony'
  },
  {
    oldUrl: '/live-singers-and-bands-for-wedding-mayra-bhaat',
    newUrl: '/blog/live-bands,-singers-for-mayra-or-bhaat-in-rajasthani-marwadi-wedding'
  },
  {
    oldUrl: '/live-singers-and-live-bands-for-wedding-vedic-musical-pheras',
    newUrl: '/blog/singer-and-live-bands-for-vedic-musical-pheras-in-weddings'
  },
  {
    oldUrl: '/live-singers-and-bands-for-wedding-sufi-night',
    newUrl: '/blog/sufi-singer-and-live-bands-for-wedding'
  },
  {
    oldUrl: '/live-singers-and-bands-for-wedding-ghazal-nights',
    newUrl: '/blog/ghazal-live-bands-and-singers-for-weddings'
  },
  {
    oldUrl: '/live-singers-and-bands-for-wedding-ghazal-nights',
    newUrl: '/blog/ghazal-live-bands-and-singers-for-weddings'
  },
  {
    oldUrl: '/singers-and-live-bands-for-ganesh-puja',
    newUrl: '/blog/hire-live-singers-and-bands-for-wedding-ganesh-puja'
  },
  {
    oldUrl: '/virtual-wedding-events',
    newUrl: '/blog/book-live-bands-and-singers-for-virtual-wedding-events'
  },
  {
    oldUrl: '/singers-for-rajasthani-marwari-wedding',
    newUrl: '/blog/book-singers-for-rajasthani-marwari-weddings'
  },
  {
    oldUrl: '/male-singers-for-corporate-event',
    newUrl: '/blog/male-singers-for-corporate-event'
  },
  {
    oldUrl: '/female-singers-for-corporate-events-2',
    newUrl: '/blog/female-singers-for-corporate-events'
  },
  {
    oldUrl: '/live-band-for-corporate-event',
    newUrl: '/blog/live-band-for-corporate-event'
  },
  {
    oldUrl: '/instrumentalist-for-corporate-event',
    newUrl: '/blog/instrumentalist-for-corporate-event'
  },
  {
    oldUrl: '/dj-for-a-corporate-event',
    newUrl: '/blog/dj-for-a-corporate-event'
  },
  {
    oldUrl: '/live-singers-for-virtual-events',
    newUrl: '/blog/live-singers-for-virtual-events'
  },
  {
    oldUrl: '/female-singer-for-virtual-events',
    newUrl: '/blog/female-singer-for-virtual-events'
  },
  {
    oldUrl: '/virtual-singers-for-corporate-events',
    newUrl: '/blog/virtual-singers-for-corporate-events'
  },
  {
    oldUrl: '/book-live-singer-and-band-for-house-party-in-mumbai',    
    newUrl: '/blog/book-live-singer-and-band-for-house-party-in-mumbai'
  },
  {
    oldUrl: '/singer-for-house-party-in-mumbai',
    newUrl: '/blog/singer-for-house-party-in-mumbai'
  },
  {
    oldUrl: '/female-singer-for-house-party',
    newUrl: '/blog/book-female-singer-for-house-party-in-mumbai'
  },
  {
    oldUrl: '/book-singer-for-birthday-party',
    newUrl: '/blog/book-singer-for-birthday-party'
  },
  {
    oldUrl: '/hire-a-singer-for-birthday',
    newUrl: '/blog/hire-a-talented-singers-for-birthday-parties'
  },
  {
    oldUrl: '/artist/book-singer-for-gujarati-wedding',
    newUrl: '/blog/book-singers-for-gujarati-wedding'
  },
  {
    oldUrl: '/book-singer-for-sindhi-wedding',
    newUrl: '/blog/book-singer-for-sindhi-wedding'
  },
  {
    oldUrl: '/book-celebrity-singer-for-wedding-events',
    newUrl: '/blog/hire-celebrity-singers-for-wedding'
  },
  { oldUrl: '/dj-for-wedding', newUrl: '/blog/dj-for-wedding' },
  {
    oldUrl: '/singer-in-mumbai',
    newUrl: '/blog/book-playback-singers-in-mumbai'
  },
  {
    oldUrl: '/book-singer-in-mumbai',
    newUrl: '/blog/book-singer-in-thane'
  },
  {
    oldUrl: '/book-singer-in-navi-mumbai',
    newUrl: '/blog/book-singer-in-navi-mumbai'
  },
  {
    oldUrl: '/book-singers-in-lonavala',
    newUrl: '/blog/book-singers-in-lonavala'
  },
  {
    oldUrl: '/book-singers-in-pune',
    newUrl: '/blog/book-singers-in-pune'
  },
  {
    oldUrl: '/book-singers-in-alibag',
    newUrl: '/blog/book-singers-in-alibag'
  },
  {
    oldUrl: '/book-singers-in-surat',
    newUrl: '/blog/book-singers-in-surat'
  },
  {
    oldUrl: '/book-singers-in-nagpur',
    newUrl: '/blog/book-singers-in-nagpur'
  },
  {
    oldUrl: '/book-singers-in-mahabaleshwar',
    newUrl: '/blog/book-singers-in-mahabaleshwar'
  },
  {
    oldUrl: '/book-singers-in-bengaluru-karnataka',
    newUrl: '/blog/book-singers-in-bengaluru,-karnataka'
  },
  {
    oldUrl: '/book-singers-in-thiruvanathapuram-kerala',
    newUrl: '/blog/book-singers-in-thiruvanathapuram,-kerala'
  },
  {
    oldUrl: '/book-singers-in-chennai-tamil-nadu',
    newUrl: '/blog/book-singers-in-chennai,-tamil-nadu'
  },
  {
    oldUrl: '/book-singer-in-amravati-andhra-pradesh',
    newUrl: '/blog/book-singer-in-amravati,-andhra-pradesh'
  },
  {
    oldUrl: '/book-singers-in-hydrabad-telangana',
    newUrl: '/blog/book-singers-in-hyderabad,-telangana'
  },
  {
    oldUrl: '/book-singer-in-raipur-chhattisgarh',
    newUrl: '/blog/book-singer-in-raipur,-chhattisgarh'
  },
  {
    oldUrl: '/book-singer-in-odisha-bhubaneshwar',
    newUrl: '/blog/book-singer-in-odisha,-bhubaneshwar'
  },
  { oldUrl: '/book-singer-in-goa', newUrl: '/blog/book-singer-in-goa' },
  {
    oldUrl: '/book-singers-in-gujrat',
    newUrl: '/blog/book-singers-in-gujrat'
  },
  {
    oldUrl: '/book-singers-in-dubai',
    newUrl: '/blog/book-singers-in-dubai'
  },
  {
    oldUrl: '/book-singer-in-shrilanka',
    newUrl: '/blog/book-singer-in-shrilanka'
  },
  {
    oldUrl: '/book-singer-in-thailand',
    newUrl: '/blog/book-singer-in-thailand'
  },
  {
    oldUrl: '/book-singer-in-singapore',
    newUrl: '/blog/book-singer-in-singapore'
  },
  {
    oldUrl: '/book-singer-in-saudi-arabia',
    newUrl: '/blog/book-singer-in-saudi-arabia'
  },
  {
    oldUrl: '/book-singers-in-u-s-a',
    newUrl: '/blog/book-singers-in-u.s.a'
  },
  {
    oldUrl: '/book-singer-in-malaysia',
    newUrl: '/blog/book-singer-in-malaysia'
  },
  {
    oldUrl: '/book-singer-in-myanmar',
    newUrl: '/blog/book-singer-in-myanmar'
  },
  {
    oldUrl: '/book-singers-in-u-k',
    newUrl: '/blog/book-singers-in-u.k'
  },
  {
    oldUrl: '/book-singer-in-canada',
    newUrl: '/blog/book-singer-in-canada'
  },
  {
    oldUrl: '/book-singers-in-south-africa',
    newUrl: '/blog/book-singers-in-south-africa'
  },
  {
    oldUrl: '/book-singer-in-kuwait',
    newUrl: '/blog/book-singer-in-kuwait'
  },
  {
    oldUrl: '/book-singers-in-mauritius',
    newUrl: '/blog/book-singers-in-mauritius'
  },
  {
    oldUrl: '/book-singer-in-nigeria',
    newUrl: '/blog/book-singer-in-nigeria'
  },
  {
    oldUrl: '/book-singers-in-oman',
    newUrl: '/blog/book-singers-in-oman'
  },
  {
    oldUrl: '/book-singer-in-australia',
    newUrl: '/blog/book-singer-in-australia'
  },
  {
    oldUrl: '/book-singer-in-singapore-2',
    newUrl: '/blog/book-singer-in-singapore'
  },
  {
    oldUrl: '/book-singer-in-nepal',
    newUrl: '/blog/book-singer-in-nepal'
  },
  {
    oldUrl: '/book-singer-in-trinidad-and-tobago',
    newUrl: '/blog/book-singer-in-trinidad-and-tobago'
  },
  {
    oldUrl: '/book-singer-in-france',
    newUrl: '/blog/book-singer-in-france'
  },
  {
    oldUrl: '/book-singer-in-bahrain',
    newUrl: '/blog/book-singer-in-bahrain'
  },
  {
    oldUrl: '/book-singer-in-fiji',
    newUrl: '/blog/book-singer-in-fiji'
  },
  {
    oldUrl: '/book-singer-in-guyana',
    newUrl: '/blog/book-singer-in-guyana'
  },
  {
    oldUrl: '/book-singer-in-netherlands',
    newUrl: '/blog/book-singer-in-netherlands'
  },
  {
    oldUrl: '/book-bollywood-singer-in-new-zealand',
    newUrl: '/blog/book-bollywood-singer-in-new-zealand'
  },
  {
    oldUrl: '/book-bollywood-singers-in-italy',
    newUrl: '/blog/book-bollywood-singers-in-italy'
  },
  {
    oldUrl: '/book-bollywood-singer-in-germany',
    newUrl: '/blog/book-bollywood-singer-in-germany'
  },
  {
    oldUrl: '/book-hindi-singers-in-philippines',
    newUrl: '/blog/book-hindi-singers-in-philippines'
  },
  {
    oldUrl: '/book-indian-singer-in-indonesia',
    newUrl: '/blog/book-indian-singer-in-indonesia'
  },
  {
    oldUrl: '/book-indian-singer-in-israel',
    newUrl: '/blog/book-indian-singer-in-israel'
  },
  {
    oldUrl: '/book-bollywood-singers-in-sweden',
    newUrl: '/blog/book-bollywood-singers-in-sweden'
  },
  {
    oldUrl: '/book-hindi-singer-in-ireland',
    newUrl: '/blog/book-hindi-singer-in-ireland'
  },
  {
    oldUrl: '/book-bollywood-singer-in-brazil',
    newUrl: '/blog/book-bollywood-singer-in-brazil'
  },
  {
    oldUrl: '/book-bollywood-singer-in-bangladesh',
    newUrl: '/blog/book-bollywood-singer-in-bangladesh'
  },
  {
    oldUrl: '/book-bollywood-singers-in-istanbul-turkey',
    newUrl: '/blog/book-bollywood-singers-in-istanbul-turkey'
  },
  {
    oldUrl: '/book-hindi-singer-in-egypt',
    newUrl: '/blog/book-hindi-singer-in-egypt'
  },
  {
    oldUrl: '/live-music-band-for-wedding',
    newUrl: '/event-category/wedding/live-singer'
  },
  {
    oldUrl: '/virtual-events',
    newUrl: '/event-category/virtual/virtual-events'
  },
  {
    oldUrl: '/private-events',
    newUrl: '/event-category/virtual/virtual-events'
  },
  {
    oldUrl: '/get-together-parties',
    newUrl: '/event-category/get-together/singers'
  },
  {
    oldUrl: '/anniversaries',
    newUrl: '/event-category/private/anniversary'
  },
  {
    oldUrl: '/devotional-events',
    newUrl: '/event-category/religious/devotional-events'
  },
  {
    oldUrl: '/carnival-event',
    newUrl: '/event-category/festivals/carnival-events'
  },
  {
    oldUrl: '/book-singer-for-concert',
    newUrl: '/event-category/concerts/singers'
  },
  {
    oldUrl: '/krishna-pandey-live',
    newUrl: '/artist/singer/krishna-pandey-live'
  },
  {
    oldUrl: '/book-singers-in-mumbai',
    newUrl: '/blog/book-singers-in-mumbai'
  },
  {
    oldUrl: '/singers-in-mumbai',
    newUrl: '/blog/book-singers-in-mumbai'
  },
  {
    oldUrl: 'book-singer-for-event',
    newUrl: '/blog/book-singers-for-event'
  },
  {
    oldUrl: '/abhigyan-das',
    newUrl: '/artist/singer/abhigyan-das-live'
  },
  {
    oldUrl: '/book-live-singers-bands-and-celebrities-for-college-festivals',
    newUrl: '/blog/book-live-singers,-bands-and-celebrities-for-college-festivals'
  },
  {
    oldUrl: '/musical-entertainer-for-wedding',
    newUrl: '/blog/hire-musical-entertainer-for-wedding'
  },
  {
    oldUrl: '/singers-for-wedding',
    newUrl: '/event-category/wedding/live-singer'
  },
  {
    oldUrl: '/book-live-singers-bands-instrumentalists-and-celebrities-for-corporate-events',
    newUrl: '/event-category/corporate/corporate-event'
  },
  {
    oldUrl: '/saaj-bhatt',
    newUrl: '/artist/live-band/saaj-bhatt-live'
  },
  {
    oldUrl: '/guitarist-for-event',
    newUrl: '/artist-category/musicians/guitarist'
  },
  {
    oldUrl: '/book-live-singers',
    newUrl: '/artist-category/singers/singers'
  },
  {
    oldUrl: '/book-celebrity-singers-for-events',
    newUrl: '/artist-category/singers/celebrity-singers'
  },
  {
    oldUrl: '/salman-ali',
    newUrl: '/artist/singer/salman-ali'
  },
  {
    oldUrl: '/ammy-virk',
    newUrl: '/artist/celebrity-singer/ammy-virk'
  },
  {
    oldUrl: '/book-live-singers-music-bands-and-celebrities-for-virtual-events',
    newUrl: '/event-category/virtual/virtual-events'
  },
  {
    oldUrl: '/aastha-gill',
    newUrl: '/artist/celebrity-singer/aastha-gill'
  },
  {
    oldUrl: '/hire-singers-for-wedding-in-mumbai/',
    newUrl: '/event-category/wedding/live-singer'
  },
  {
    oldUrl: '/bollywood-male-singer',
    newUrl: '/artist-category/singers/bollywood-singers'
  },
  {
    oldUrl: '/female-singer-for-wedding',
    newUrl: '/artist-category/singers/female-singers'
  },
  {
    oldUrl: '/neha-kakkar',
    newUrl: '/artist/celebrity-singer/neha-kakkar'
  },
  {
    oldUrl: '/hire-bollywood-singers-in-malaysia',
    newUrl: '/blog/book-singer-in-malaysia'
  },
  {
    oldUrl: '/book-a-live-band-in-mumbai',
    newUrl: '/blog/book-singers-in-mumbai'
  },
  {
    oldUrl: '/bollywood-singers-for-virtual-events',
    newUrl: '/artist-category/singers/bollywood-singers'
  },
  {
    oldUrl: '/singer-for-wedding-sangeet',
    newUrl: '/blog/live-bands-and-singers-for-wedding-sangeet'
  },
  {
    oldUrl: '/antara-mitra',
    newUrl: '/artist/singer/antara-mitra'
  },
  {
    oldUrl: '/pritam-chakraborty',
    newUrl: '/artist/singer/pritam-chakraborty'
  },
  {
    oldUrl: '/nikhita-gandhi-book-my-singer',
    newUrl: '/artist/singer/nikhita-gandhi'
  },
  {
    oldUrl: '/live-band-for-corporate-events',
    newUrl: '/event-category/corporate/corporate-event'
  },
  {
    oldUrl: '/shashwat-singh',
    newUrl: '/artist/celebrity-singer/shashwat-singh'
  },
  {
    oldUrl: '/shalmali-kholgade',
    newUrl: '/artist/celebrity-singer/shalmali-kholgade'
  },
  {
    oldUrl: '/shilpa-rao',
    newUrl: '/artist/celebrity-singer/shilpa-rao'
  },
  {
    oldUrl: '/harrdy-sandhu',
    newUrl: '/artist/celebrity-singer/harrdy-sandhu'
  },
  {
    oldUrl: '/siddharth-mahadevan',
    newUrl: '/artist/celebrity-singer/siddharth-mahadevan'
  },
  {
    oldUrl: '/tony-kakkar',
    newUrl: '/artist/celebrity-singer/tony-kakkar'
  },
  {
    oldUrl: '/sagar-tripathy',
    newUrl: '/artist/singer/sagar-tripathy'
  },
  {
    oldUrl: '/book-hindi-singer-in-suriname',
    newUrl: '/blog/book-hindi-singer-in-suriname'
  },
  {
    oldUrl: '/book-a-live-band-for-party',
    newUrl: '/artist-category/live-bands/live-bands'
  },
  {
    oldUrl: '/instrumental-music-band-for-corporate-events',
    newUrl: '/event-category/corporate/corporate-event'
  },
  {
    oldUrl: '/jonita-gandhi',
    newUrl: '/artist/celebrity-singer/jonita-gandhi'
  },
  {
    oldUrl: '/hire-live-ghazal-singer',
    newUrl: '/artist-category/singers/ghazal-singers'
  },
  {
    oldUrl: '/book-sonu-nigam',
    newUrl: '/artist/celebrity-singer/sonu-nigam'
  },
  {
    oldUrl: '/female-singers-for-corporate-events',
    newUrl: '/event-category/corporate/corporate-event'
  },
  {
    oldUrl: '/book-shruti-rane-2',
    newUrl: '/artist/singer/shruti-rane'
  },
  {
    oldUrl: '/hire-bollywood-female-singer',
    newUrl: '/blog/hire-bollywood-female-singers'
  },
  {
    oldUrl: '/hire-bollywood-singer-for-event-in-dubai',
    newUrl: '/blog/book-singers-in-dubai'
  },
  {
    oldUrl: '/hire-singers-for-mayra-or-bhaat-ceremony',
    newUrl: '/blog/hire-live-singers-and-bands-for-mayra-bhaat'
  },
  {
    oldUrl: '/book-singer-for-punjabi-haldi-or-mehndi-ceremony',
    newUrl: '/blog/hire-live-singers-and-bands-for-punjabi-wedding'
  },
  {
    oldUrl: '/bollywood-singer-for-wedding-in-dubai',
    newUrl: '/blog/book-singers-in-dubai'
  },
  {
    oldUrl: '/book-singers-for-punjabi-wedding',
    newUrl: '/blog/hire-live-singers-and-bands-for-punjabi-wedding'
  },
  {
    oldUrl: '/blog/singers-and-live-bands-for-ganesh-puja',
    newUrl: '/hire-live-singers-and-bands-for-wedding-ganesh-puja'
  },
  {
    oldUrl: '/guitarist-for-events',
    newUrl: '/artist-category/musicians/guitarist'
  },
  {
    oldUrl: '/book-live-instrumentalists',
    newUrl: '/blog/book-instrumentalists-musicians-for-your-events'
  },
  {
    oldUrl: '/music-band-in-mauritius-wedding',
    newUrl: '/blog/book-singers-in-mauritius'
  },
  {
    oldUrl: '/guitarist-for-birthday-party/',
    newUrl: '/artist-category/musicians/guitarist'
  },
  {
    oldUrl: '/singer-and-live-music-band-for-mehndi-ceremony-for-wedding',
    newUrl: '/blog/hire-live-singers-and-bands-for-wedding-mehndi'
  },
  {
    oldUrl: '/live-singer-for-mehndi-ceremony-in-wedding',
    newUrl: '/blog/hire-live-singers-and-bands-for-wedding-mehndi'
  },
  {
    oldUrl: '/book-grand-piano-for-wedding-reception',
    newUrl: '/artist-category/musicians/grand-piano'
  },
  {
    oldUrl: '/book-flute-artist-for-wedding-reception',
    newUrl: '/artist-category/musicians/flute-player'
  },
  {
    oldUrl: '/sufi-singers-in-mumbai',
    newUrl: '/blog/book-sufi-live-bands-for-events'
  }
];

module.exports = redirections;
