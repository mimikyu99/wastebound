Events.on(ClientLoadEvent, () => {
    // 1. Fetch the image asset from the game cache
    const bgTexture = Core.atlas.find("wastebound-menu-bg");

    if (!bgTexture || !bgTexture.found) {
        Log.err("[WASTEBOUND] fix yo shii!");
        return;
    }

    // 2. Wrap your image into a UI-compatible drawable texture object
    const menuBackgroundDrawable = new TextureRegionDrawable(bgTexture);

    // 3. Inject the background image directly into the main menu layout
    Vars.ui.menufrag.init = wrap(Vars.ui.menufrag, "init", (original, table) => {
        // Run vanilla main menu button generation first
        original(table);

        // Build a UI stack layer and force it to the very back
        table.stack(new Table(cons(t => {
            t.background(menuBackgroundDrawable);
            t.setFillParent(true);
        }))).toBack();
    });

    Log.info("[WASTEBOUND] w speed");
});
