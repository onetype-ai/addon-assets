// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import assets from '#assets/addon.js';

assets.Fn('get.js', function(context = {})
{
    return this.Fn('get.build', 'js', context);
});
