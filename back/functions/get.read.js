// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import fs from 'fs';

import assets from '#assets/addon.js';

assets.Fn('get.read', function(files)
{
    return files
        .filter((file) => fs.existsSync(file))
        .map((file) => fs.readFileSync(file, 'utf8'))
        .filter(Boolean);
});
