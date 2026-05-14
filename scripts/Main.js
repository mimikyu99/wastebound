Events.on(ClientLoadEvent, () => {
    // 1. Fetch your mod's texture asset safely
    const bgTexture = Core.atlas.find("wastebound-menu-bg");

    if (!bgTexture || !bgTexture.found) {
        Log.err("[WASTEBOUND] fix yo shii dawg");
        return;
    }

    // 2. Properly subclass MenuRenderer to prevent Java engine crashes
    Vars.menuRenderer = extend(MenuRenderer, {
        render() {
            // Clear frame artifacts
            Draw.clear(Color.black);

            // Establish the draw matrix using current window resolution
            const screenWidth = Core.graphics.getWidth();
            const screenHeight = Core.graphics.getHeight();
            Draw.proj(0, 0, screenWidth, screenHeight);

            // Fetch texture dimensions
            const imgWidth = bgTexture.width;
            const imgHeight = bgTexture.height;

            // Aspect ratio calculation to avoid stretching
            const screenRatio = screenWidth / screenHeight;
            const imgRatio = imgWidth / imgHeight;

            let drawWidth = screenWidth;
            let drawHeight = screenHeight;

            if (screenRatio > imgRatio) {
                drawHeight = screenWidth / imgRatio;
            } else {
                drawWidth = screenHeight * imgRatio;
            }

            // Draw the texture centered onto the coordinate grid
            Draw.rect(
                bgTexture, 
                screenWidth / 2, 
                screenHeight / 2, 
                drawWidth, 
                drawHeight
            );

            // Safely flush the graphics pipeline
            Draw.flush();
        }
    });
});
            drawWidth = screenHeight * imgRatio;
        }

        // Draw the image centered onto the screen matrix
        Draw.rect(
            bgTexture, 
            screenWidth / 2, 
            screenHeight / 2, 
            drawWidth, 
            drawHeight
        );

        // Flush rendering pipeline to execute draw commands
        Draw.flush();
    };
});
          
