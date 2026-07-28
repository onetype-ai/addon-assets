// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import assets from '#assets/addon.js';

assets.FnExpose('get.commands', function()
{
    this.asked = () =>
    {
        return {
            v: {
                type: 'string',
                description: 'Cache busting token from the html shell, ignored by the build.'
            },
            scope: {
                type: 'string',
                description: 'Which scope to build, empty builds every one.'
            }
        };
    };

    this.served = (type) =>
    {
        return async function(properties, resolve)
        {
            const context = Object.assign({}, this, {
                assets: {
                    version: properties.v,
                    scope: properties.scope
                }
            });

            resolve(await assets.Fn('get.build', type, context));
        };
    };

    this.route = (commands, type) =>
    {
        commands.Item({
            id: 'assets:' + type,
            exposed: true,
            silent: true,
            method: 'GET',
            endpoint: '/assets/build.' + type,
            type: type.toUpperCase(),
            in: this.asked(),
            callback: this.served(type)
        });
    };

    const commands = onetype.AddonGet('commands');

    if(!commands)
    {
        return false;
    }

    this.route(commands, 'js');
    this.route(commands, 'css');

    return true;
}, 'Registers the two routes that serve the built script and stylesheet, once commands is loaded.');
