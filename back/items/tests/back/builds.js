// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'assets:back/builds',
        addon: 'assets',
        description: 'The script build takes its entries in order, runs a snippet written as a function, and closes the whole thing in one scope.',
        callback: function({ assert })
        {
            this.assets = onetype.AddonGet('assets');

            this.entered = () =>
            {
                this.assets.Item({
                    type: 'js',
                    order: 20,
                    content: 'const second = 2;'
                });

                this.assets.Item({
                    type: 'js',
                    order: 10,
                    content: 'const first = 1;'
                });

                this.assets.Item({
                    type: 'js',
                    order: 30,
                    content: () =>
                    {
                        return 'const third = 3;';
                    }
                });
            };

            this.ordered = (built) =>
            {
                assert.truthy(built.indexOf('first') < built.indexOf('second'), 'a lower order goes in first');
                assert.truthy(built.indexOf('second') < built.indexOf('third'), 'and the rest follow it');
            };

            this.called = (built) =>
            {
                assert.match(built, 'const third = 3;', 'a snippet written as a function is called for its source');
            };

            this.scoped = (built) =>
            {
                assert.truthy(built.startsWith('(function(){'), 'the script opens one scope');
                assert.truthy(built.endsWith('})();'), 'and closes it, so nothing leaks to the page');
            };

            this.entered();

            const built = this.assets.Fn('get.js');

            this.ordered(built);
            this.called(built);
            this.scoped(built);
        }
    });
});
