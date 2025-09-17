NEW 
- Added new CraftLogic UI
- Several CPU and Memory usage optimisations.
- Added "Add Padding" and "Patch Hole" garment-ui context menu display icons for the fabric item.
- Clicking on the top half of a two-container object's sprite will select the second container in the loot window.
- Added two extra levels for zooming in on the mini-map.
- Added an in-game-map option called "PlayerZoom" to control whether the player model is displayed at zoom level 20 or greater.
- Added ability to bind a hotkey for toggling the Building UI.

This is currently unassigned, and will require a player to bind a key to it.


- Added ability to use Shift, CTRL or ALT modifier to keybindings.

There are currently no new keybinding using this, but players can set up their own.
Only one modifier key can be used.


- Added a new type of style layer, "Text", to the in-game map.

Text layers are used to define the font and color of the baked-in map annotations, instead of specifying font and color for every annotation separately. When a text annotation's alpha value is set to zero, the text-layer's color is used.
User annotations are all assigned to the "text-note" layer that uses the Handwritten font.

- Updated streets.xml with Louisville streets.
- Optimized rendering of image pyramids in the in-game map.
- Changed multithreading in ImagePyramid to possibly fix hanging when entering GameLoadingState.
- Map annotations may be resized and rotated.
- Map annotations can be configured to "stick" to the surface of the map, respecting the isometric and orthographic perspectives.
- The "Edit Note" tool is now named "Edit Marking" and works on texture annotations, allowing the color to be changed.
- Map annotations may be duplicated by holding the Shift key while dragging with the "Move Marking" tool.
- Maps may have default non-editable annotations defined in a file named worldmap-annotations.lua in the map directory.

This can be used for city names and other map features. worldmap-annotations.lua can be edited in the F8 map editor. It is possible to configure the font and min/max zoom levels of these annotations.

- Default annotations may be hidden by unchecking the MapLabels map option.
- Added support for multi-line text annotations.
- The world map remembers whether print-media icons are displayed or not.
- Streets aren't highlighted when the mouse pointer is over a child panel of the in-game map.
- Fixed the incorrect alpha being saved in the annotations editor.

- Added automatic orientation detection for the Build Menu.
- Consolidated all lua-side Fireplace handling code with the lua-side BBQ handling code.
- Removed now unused lua files specifically for handling Fireplaces.
- Added some functions to IsoObject to handle "fire-interaction-tiles" and propane tanks in preparation for using ECS to handle tiles/objects.
- Animal custom names are now displayed above the animal, when animal designations zones are highlighted.
- Animal designation zones are highlighted when the "Check Zone" context-menu option is highlighted.
- Water-source items are highlighted when the corresponding context-menu option is highlighted.
- The icon for water-source items is displayed next to the corresponding context-menu option.
- Animal submenu options display the animal icon, and highlight the animal when the option is highlighted.
- Display the "Info" icon next to "Feeding Trough Info" and "Animal Info" context-menu options.
- The animal "Grab" and "Pet" context-menu options display the same icons as the animal radial menu.
- Transfer Fluids UI now closes when players move an item from their inventory or from the world
- Updated Molotov recipe so it no longer requires a second fluid container.
- Updated ISLightFromKindle timed action to use an animation and display items.
- Added new component ContextMenuConfig to handle right-click context options.
- It is now possible to take bricks or gold bars from pallets.
- It is now possible to open and close lids for the amphora and round rain barrels.
- It is now possible to create a hot beverage using metal cups or a tumbler glass, both from inventory and coffee machine.
- Players can now interact with mannequins to manage outfits. You can either swap your entire outfit with the one on the mannequin, or add the mannequin’s outfit on top of what you're currently wearing

This is done via buttons in the Inventory UI for a mannequin, similar to the buttons for interacting with Stoves and Microwaves, located in the top of the loot inventory window.
The text for switching/storing/wearing outfits is contextual regarding whether the player and mannequin are wearing any clothing items; if both are wearing clothing, "Switch Outfits"; if only the player is wearing clothing "Store Worn Outfit"; if only the mannequin is wearing clothing "Wear Outfit". These can be changed in ContextMenu_EN.txt to whatever text strings would be desirable.


Recipe Browsing:
- Inventory items that can be used as inputs for craft recipes that the player can "See" or knows can be right-clicked to reveal an option to see recipes; this will open the crafting UI with the required item filter set to the item in question.
- Craft recipes in recipe magazines that the player can "See" or knows can be viewed in the crafting UI via navigating with right click on the magazine to see a list of clickable recipes.
- Craft recipes that the player can See in the discovered recipes tab in the discovered stuff UI can be clicked on to see the craft recipe in the crafting UI.
- In the above two instances favorited recipe names will be rendered in the player-defined good color, which defaults to green.
- If a craft recipe requires a workstation the workstation requirement will be plainly stated in the recipe information box.
- Fixed being able to perform craft recipes that are supposed to require a workstation being performable under some circumstances without the workstation.
- Building Recipes can be navigated-to/"browsed" from Recipe Magazines and the Discovered Recipes List.

- Clicking on a growing season recipe in the LiteratureUI recipes tab will switch the tab view to the growing seasons tab; however it will not scroll to the growing season in question yet.
- Recipe magazines that contain growing seasons that they player knows will have a right click option "See Growing Seasons"; this will open the discovered literature UI to the growing seasons tab. This does not scroll to any specific growing seasons, it just provides a contextual shortcut for the player to navigate to or find the growing seasons list.

- Added the lua function getRecipeIcon; this is used as a general purpose function to get the icon for a recipe-string regardless of what kind of recipe it is for recipe-browsing purposes.
- The list of recipes in the media and recipes UI will display the icon for a recipe.
- Fixed more empty seed bags for newer crops that showed up in the recipe magazine list.
- Fixed the recipe for making magnesium shavings from a magnesium firestarter being missing.
- Magnesium shavings can be used as tinder, and the magnesium firestarter can be used to ignite tinder.
- Changed category for Forge_Kettle and Forge_Saucepan to Cookware (was previously Blacksmithing.
- Tools in equipped/worn containers are now considered valid for use in the Mechanics window.
- Modified auto-close function for TV/Radio UI during disassembly so it can no longer be opened during the action.
- Context menu options that used to be red now use the player-defined bad color.
- Reimplemented the Lua ipairs function in Java.
- Thrown, timer, and remote-detonated explosives now increase the character’s zombie kill count.
- Sprinting into doors now causes the players to trip
- BBQs, Wood Stoves, and Fireplace tile objects can be interacted with for all their fire-tile-properties via buttons on the top of their inventory window.
- The menu for feeding fuel to fire tiles has better player-facing feedback regarding when there's not enough fuel-space for a specific item.
- Campfires can be interacted with via their inventory window, providing the same functionality that right clicking on them provides.
- Added text when right clicking on the world context that informs the player that BBQ/Campfire/Fireplace/etc. interactions are available in the inventory window, similar to the world context right click information regarding tents and campfire kits.
- Rearranged the spacing of the elements of the top bar of the inventory window so that there is more room for contextual buttons for containers that are mannequins or fire tiles objects at smaller resolutions.
- Changed hot-saving of chunks to only happen when there are few other chunks waiting to be saved.

- Added new SFX when Zombies use Claws to scratch on Thump surfaces.
- Added new SFX for Microwave Open, Close, TransferItems.
- Added new SFX for opening Wooden Drawers.
- Added new Megaphone SFX for Hey, Heywhisper, Psst.
- Added new SFX for Mannequin Transfer Items.
- Added new SFX for Containers: Antique Oven, Fireplace and BBQ
- Changed SFX for interacting with Trauma and other Duffle Bags.

BALANCE

- Increased chance to find Clay near lakes.
- Building a butcher hook now requires a Large Hook.
- Building a pottery wheel now requires 2 Stone Wheels, one of each size.
- Increased torch lighting by 20%.
- Changed Herb drying to take 1 in-game day.
- Changed Leather drying to take 7 in game days.
- Rabbits now drop correct leather.
- Small animals may be killed without a weapon, while held by the player.

This includes chickens, mice, rabbits, rats and baby turkeys. This makes it easier to kill animals removed from a trap.


- Fine-tuning fall damage values.

No longer receiving 1% fall damage while breaking a leg from a hard fall.
Fall damage now more proportional to associated injuries.
No longer 100% guaranteed severe fracture if jumping off second storey building. Closer to 50%
No longer 100% guaranteed severe fracture to two limbs if jumping off third storey building. Closer to 90%
Fatal falls no longer completely remove all damage if unscratched chance is hit. Now it's still not fatal, but still deals 5% of total calculated damage.

- Fall damage hurts more when already injured.

Broken legs and spine multiply the incurred damage the most.
Broken arms cause almost as much.
Other injuries such as deep injuries and minor injuries also append some damage.
Fixed missing falling anim for when character first starts falling.

- Changes to zombie fall damage.

Falling from the 20th floor now causes 95-99% fatalities
Falling from the 10th floor causes 40-50% fatalities.
50% of all survivors become fakeDead.


FIXES
- Fixed canceling barricade timed action if door opened while barricading
- Fixed issue where bugged build action would leave build menu unusable
- Fixed multiple depth related visual issues with tiles and models.
- Fixed hunger value changes for fish.
- Fixed the bulk of trash caught at higher Fishing levels
- Fixed player being able to continue fishing after rod has been unequipped
- Fixed equipping rod while aiming at water prevents fishing mechanic
- Fixed error when a fishing line breaks.
- Fixed reeling not working as intended
- Fixed required input amount for Extract Iron and Extract Steel from Smaller Items recipes.
- Fixed the ZGC garbage collector being disabled on newer versions of Windows.
- Fixed an error when disassembling a powered TV.
- Fixed various issues with zombie updates skipping frames.
- Fixed the broken appearance of doors when outlined (when being disassembled for example).
- Fixed an exception in IsoFireplace if fire sprites don't exist.
- Fixed in-game-map "Add Note" appearing outlined before placing.
- Fixed being able to create street-name streets with a single point, and removed several single-point streets from streets.xml.
- Fixed the mini-map displaying the debug terrain image instead of regular map features.
- Fixed being unable to walk on floors placed over water tiles.
- Fixed the in-game map showing the terrain image by default for mods that call MapUtils.initDefaultStyleV1() instead of the newer MapUtils.initDefaultStyleV3().
- Fixed Glorious Spiffo statue breaking when attempting to move it.
- Fixed Character stomping or attacking "downed" zed too early, playing the stomping animation for a zombie that wasn't yet on the ground.
- Fixed duplicated anim hit reaction.
- Fixed instances of zombies incorrectly staggering back and falling as if they've been hit again.
- Fixed error when a bomb with sensor range is triggered.
- Fixed an exception when creating a savefile thumbnail image when zoom is disabled.
- Fixed the circle stencil appearing in the option screen when zoom is disabled.
- Fixed building feeding through not removing the placeholder thumpable, leading to duplication.
- Fixed composters multiplying bowls, cans or other food containers.
- Fixed discovered media pages duplicating watched media every time the window is opened.
- Fixed error when right clicking on explosive traps.
- Fixed player character's shadow display error when backing over rugs.
- Fixed empty livestock trailers acting like temporal batteries that discharge all their stored time into the first animal unlucky enough to be placed inside, killing the animal due to old age.
- Fixed eggs layed in a livestock trailer not going into the food container as intended, when the egg container is already full.
- Fixed animals sometimes getting stuck looping their attack animation while in the idle state.
- Fixed animal attacks possibly connecting through fences.
- Fixed no sound playing when an animal attacks a non-IsoThumpable door.
- Fixed exceptions rendering the spawn-select screen.
- Fixed a vehicle's alarm being triggered after interrupting the action to smash a window.
- Fixed unseen zombies moving multiple times faster than they should when "Tiered Zombie Updates" was enabled.
- Fixed displaying "Patch Hole" instead of "Apply Padding" in the inspect-garment ui.
- Fixed not being able to butcher dead Rabbits obtained from traps.
- Fixed icons for fired and unfired Glass Blowing Pipe.
- Fixed clicking to build opening doors.
- Fixed Animalpocalypse caused by dropping trapped animals.
- Fixed duplication bug when installing Propane Tanks in BBQs.
- Fixed errors when cleaning hutches with items stored in backpacks/carried bags.
- Fixed misplaced smoke sprites above active barbecues.
- Fixed barbecue smoke getting noticeably darker when the barbecue is highlighted.
- Fixed rag returning a dirty rag when used to light a campfire.
- Fixed exception in ISWorldObjectContextMenuLogic.addTileDebugInfo() when in debug mode when UI.HideDebugContextMenuOptions is false.
- Fixed issue where some drying racks could not be destroyed with ISDestroyCursor.
- Fixed issue where Lamp on Pillar would lose functionality after being moved.
- Fixed issue where rotating Lamp in Pillar would have the light still point into the original direction.
- Fixed Workshop Item Description not working in Mods Menu.
- Fixed Workshop links in mod.info borking what is shown in the mod selection screen.
- Fixed taking fuel from gas pumps listing some items that should not receive fluid transfers, like uninstalled vehicles' gas tanks.
- Fixed not being able to use Garden Forks to dig for worms.
- Fixed tire pressure being set to 0 when uninstalled.
- Fixed "Add to > Consolidate All" timed action only combining 2 units of Thread / Wire.
- Fixed stripe-y fog gradiation on trees.
- Fixed AnimatedModel.isModelInstanceReady() exception in the Customise Character screen.
- Fixed the character-creation avatar stopping it's walk or run animation when the mouse moves.
- Fixed the character-creation avatar's appearance not always reverting to the selected value when the mouse pointer leaves a combobox.
- Fixed not arranging the various clothing controls when clicking the Random button next to the Outfit combobox.
- Fixed not displaying both the color button and Type combobox next to items such as "T-shirt - Tie Dye".
- The character-creation avatar's appearance is updated when highlighting options in the Type combobox that appears next to some clothing items.
- Fixed layout of widgets in the character-creation ui when adding a co-op player or respawning in-game.
- Fixed UIElement.onMouseMoveOutside() being called for non-visible widgets.
- Fixed the "Place Item" cursor not turning red to indicate an item is too heavy to be placed on a square.
- Fixed a memory leak when displaying animal names when designation zones are visible.
- Fixed a null reference in RagdollController by ensuring weapon.attackTargetSquare is set in IsoTrap if it was previously null. This fixes errors when ragdolls were hit by concussive explosions.
- Fixed being unable to create a fruit salad using a crafted bowl.
- Fixed being unable to eat while wearing an open-faced cloth headwrap.
- Fixed being able to make Molotovs with Empty Beer Bottles.
- Fixed "Long Stone Spear" playing the wrong SwingSound.
- Fixed vehicle Add/Siphon fuel context menu from queueing multiple containers, filling them all even if the vehicle lacked enough fuel when siphoning, or overfilling the vehicle when adding fuel.
- Fixed a crash to desktop after shoving zombies with rifle equipped.
- Fixed bullet tracers ending at x,y = 0,0 when shooting windows.
- Fixed errors when disassembling powered on TV.
- Fixed "Take Engine Parts" not accepting wrenches outside of the player's main inventory.
- Fixed Spears freezing zombies on Linux.
- Fixed corpses reanimating if a player reloads a save while dragging.
- Fixed GeneratorTileRange sandbox setting not being applied to generators on load.
- Fixed UI TextBoxes from deleting extra characters when multiple characters are highlighted and backspace or del key is pressed.
- Fixed pillar-like wall corner pieces blocking the player from climbing over fences.
- Fixed the "UI Rendering FPS" option being applied incorrectly.
- Fixed feeding troughs becoming non-functional when placed by the furniture-moving tool.
- Fixed the "will attack other males" text going outside the Animal Info ui.
- Fixed odd lighting on some vehicle lightbars.
- Fixed Saucepan not using its filled model.
- Fixed various Mug model world attachments to fix floating models.
- Fixed the fluid-transfer ui closing when assigning a different container to the source or target panel.
- Fixed coffee mugs being placed under tables in cafes (tabletop clutter items in RBCafe).
- Fixed being unable to put exactly enough full in a fire tile object to hit it's maximum capacity.
- Fixed slicing cakes or pies losing hunger value, slices are now cookable and inherit that status. Slices will Spawn in the world already cooked.
- Fixed the amount of wheat seeds required for packing.
- Fixed packing sunflower or pumpkin seeds not taking the full hunger amount.
- Fixed farming magazine not teaching Create Flies Cure recipe.
- Fixed Saw into Pieces returning more items than it is supposed to.
- Fixed recipe for scrap metal gloves not requiring any metals.
- Fixed Extract Metal from Smaller Items recipe amounts for each possible input.
- Fixed not being possible to attach a recoil pad to assault rifles.
- Fixed improvised bandeaus being made of rags even when leather is used.
- Fixed Chisels and Metalworking Punch being sharpenable.
- Fixed Crafting fails when using a magazine to craft an item 1 level higher than your current skill level
- Fixed the burn time tooltip for tinder items not displaying minutes of duration the way fuel does.
- Fixed falling ragdoll zeds play both animations: land on feet and fall face to the ground when walking of the edge
- Fixed full Respirator Filters being rechargeable.
- Fixed recharging Filters not consuming the filter properly.

DEBUG
- Disabled pressing the Home key toggling between the old and new rendering system, when not in debug mode.
- Added a confirmation dialog when deleting annotations in the map editor.
- Added a filterable list of text annotations in the map editor.
- Added "Attack Player" to an animal's debug context menu.
- Removed DebugMenuPhysics .lua files.
- Removed Ragdoll Settings button from dev debug menu. Debug ragdoll and physics hit reaction settings are done through imgui.
- Fixed error when building plank barricades with build cheat on.
- Fixed incorrect "Effective Population" numbers in the Zombie Population debug ui.
- Fixed error when editing Clothing.
- Fixed Animal 'Extra Values' cheat from toggling every time the cheat panel is saved.