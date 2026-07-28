// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import assets from '#assets/addon.js';

assets.Fn('find.files', function(folder, extension = 'css', ignore = [])
{
    this.wanted = (path) =>
    {
        if(path.includes('/items/tests/'))
        {
            return false;
        }

        return !ignore.some((skip) => path.includes(skip));
    };

    this.opening = (files) =>
    {
        return ['/index.' + extension, '/addon.' + extension]
            .map((ending) => files.find((file) => file.endsWith(ending)))
            .filter(Boolean);
    };

    this.sort = (files, folders) =>
    {
        const kept = files.filter((file) =>
        {
            return this.wanted(file)
                && !file.endsWith('.back.' + extension);
        });

        const first = this.opening(kept);

        first.forEach((file) => kept.splice(kept.indexOf(file), 1));

        return {
            first: first,
            files: kept,
            folders: folders.filter((path) => this.wanted(path))
        };
    };

    return onetype.assets.read(folder, extension, this.sort);
});
