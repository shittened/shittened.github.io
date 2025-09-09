export async function Filesystem(blogs) {
    const filesystem = {
        '~/': {
            //'./socials': {
            //    'github',
            //    'lemmy',
            //    'mastodon',
            //    'itch.io',
            //    'substack',
            //},
            'games/': {
                'cowwy-jump': 'https://kiefciman.itch.io/cowwy-jump-alpha',
                'froggy-lunch': 'https://kiefciman.itch.io/froggy-lunch',
                'mine': 'https://kiefciman.itch.io/mine',
            },
            //'arcade/': {
            //    'pong': '',
            //},
            'anime/': {
                'watching/': {},
                'complete/': {},
            },
            'manga/': {
                'reading/': {},
                'complete/': {},
            },
            'links/': {
                'stallman.org': 'https://stallman.org/',
                'omfgdogs': 'https://www.omfgdogs.com/',
            },
            'blogs.txt': await blogs.Blogs(),
        }
    }

    return filesystem
}
