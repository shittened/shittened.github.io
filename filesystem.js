export function Filesystem(blogs, db, anime, manga) {
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
                'watching.txt': anime.AnimeTXT(true, db.animes),
                'watching': {},
                'completed.txt': anime.AnimeTXT(false, db.animes),
                'completed': {},
            },
            'manga/': {
                'reading.txt': manga.MangaTXT(true, db.mangas),
                'reading': {},
                'completed.txt': manga.MangaTXT(false, db.mangas),
                'completed': {},
            },
            'links/': {
                'stallman.org': 'https://stallman.org/',
                'omfgdogs': 'https://www.omfgdogs.com/',
            },
            'blogs.txt': blogs.Blogs(),
        }
    }

    return filesystem
}
