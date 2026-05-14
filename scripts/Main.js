Events.on(ClientLoadEvent, () => {
    // 1. Fetch your mod's texture asset from the engine atlas
    // Format: "mod-name-image-name" (Matches mod.hjson name and your filename)
    const bgTexture = Core.atlas.find("wastebound-menu-bg");

    // Fallback safety check if asset name is misspelled
    if (!bgTexture || !bgTexture.found) {
        Log.err("[WASTEBOUND] Failed to find sprite: wastebound-menu-bg");
        return;
    }

    // 2. Overwrite the default 3D/simulation background renderer
    Vars.menuRenderer.render = () => {
        // Clear screen artifacts
        Draw.clear(Color.black);

        // Set up the draw canvas to match current window size
        const screenWidth = Core.graphics.getWidth();
        const screenHeight = Core.graphics.getHeight();
        Draw.proj(0, 0, screenWidth, screenHeight);

        // Get native image aspect ratio properties
        const imgWidth = bgTexture.width;
        const imgHeight = bgTexture.height;

        // Calculate aspect ratios
        const screenRatio = screenWidth / screenHeight;
        const imgRatio = imgWidth / imgHeight;

        let drawWidth = screenWidth;
        let drawHeight = screenHeight;

        // Cover style calculation: Scales and crops to fill screen without stretching
        if (screenRatio > imgRatio) {
            drawHeight = screenWidth / imgRatio;
        } else {
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
          
