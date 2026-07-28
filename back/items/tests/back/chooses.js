// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'assets:back/chooses',
        addon: 'assets',
        description: 'Each build takes only its own type, a condition answering false leaves an entry out, and a snippet is called with the context.',
        callback: function({ assert })
        {
            this.assets = onetype.AddonGet('assets');

            this.mixed = () =>
            {
                this.assets.Item({
                    type: 'js',
                    order: 50,
                    content: 'const script = 1;'
                });

                this.assets.Item({
                    type: 'css',
                    order: 50,
                    content: '.styled { color: red; }'
                });
            };

            this.separated = () =>
            {
                const script = this.assets.Fn('get.js');
                const styles = this.assets.Fn('get.css');

                assert.match(script, 'const script', 'the script build carries its own entries');
                assert.falsy(script.includes('.styled'), 'and none of the stylesheet');
                assert.match(styles, '.styled', 'the stylesheet build carries its own');
                assert.falsy(styles.includes('const script'), 'and none of the script');
            };

            this.refused = () =>
            {
                this.assets.Item({
                    type: 'js',
                    order: 60,
                    content: 'const parked = 1;',
                    condition: () =>
                    {
                        return false;
                    }
                });

                assert.falsy(this.assets.Fn('get.js').includes('parked'), 'an entry whose condition refuses stays out of the build');
            };

            this.handed = () =>
            {
                let seen = null;

                this.assets.Item({
                    type: 'js',
                    order: 70,
                    content: function()
                    {
                        seen = this.probe;

                        return '';
                    }
                });

                this.assets.Fn('get.js', { probe: 'context' });

                assert.equal(seen, 'context', 'a snippet is called with the context the build was asked for');
            };

            this.mixed();
            this.separated();
            this.refused();
            this.handed();
        }
    });
});
