Events.on(ClientLoadEvent, () => {
    // Safely look up the modded texture region
    const bgTexture = Core.atlas.find("wastebound-menu-bg");

    if (!bgTexture || !bgTexture.found) {
        Log.err("[WASTEBOUND] fix yo shi gng!");
        return;
    }

    // Use a short delay to override the menu renderer after the engine completes initialization
    Timer.schedule(() => {
        Vars.menuRenderer = extend(MenuRenderer, {
            render() {
                // Clear any graphics leftovers from the viewport frame
                Draw.clear(Color.black);

                // Re-calculate view scaling based on current window constraints
                const screenWidth = Core.graphics.getWidth();
                const screenHeight = Core.graphics.getHeight();
                Draw.proj(0, 0, screenWidth, screenHeight);

                // Process aspect-ratio protection scaling
                const imgWidth = bgTexture.width;
                const imgHeight = bgTexture.height;

                const screenRatio = screenWidth / screenHeight;
                const imgRatio = imgWidth / imgHeight;

                let drawWidth = screenWidth;
                let drawHeight = screenHeight;

                if (screenRatio > imgRatio) {
                    drawHeight = screenWidth / imgRatio;
                } else {
                    drawWidth = screenHeight * imgRatio;
                }

                // Render the image centered relative to the screen layout
                Draw.rect(
                    bgTexture, 
                    screenWidth / 2, 
                    screenHeight / 2, 
                    drawWidth, 
                    drawHeight
                );

                Draw.flush();
            }
        });
        
        Log.info("[WASTEBOUND] MenuRenderer successfully forced over vanilla assets.");
    }, 0.2); // Delays execution by 0.2 seconds to allow the engine to settle
});

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
          
