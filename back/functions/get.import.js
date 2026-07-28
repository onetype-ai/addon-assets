// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import assets from '#assets/addon.js';

assets.Fn('get.import', function(modules, order = 10, condition = null)
{
    this.carried = (registered, type) =>
    {
        const paths = registered.Get(type);

        return paths ? paths : [];
    };

    this.taken = (registered, place) =>
    {
        ['js', 'css'].forEach((type) =>
        {
            this.carried(registered, type).forEach((path) =>
            {
                this.Item({
                    type: type,
                    order: order + place,
                    path: path,
                    condition: condition
                });
            });
        });
    };

    modules.forEach((name, place) =>
    {
        const registered = onetype.assets.get(name);

        registered && this.taken(registered, place);
    });
});
