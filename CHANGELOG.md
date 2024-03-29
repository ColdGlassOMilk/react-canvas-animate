# Changelog

All notable changes to this project will be documented in this file.

<!-- ## [Unreleased]
## [Version x.x.x] - YYYY-MM-DD

### Added

- [Feature 1]
- [Feature 2]

### Changed

- [Change 1]
- [Change 2]

### Deprecated

- [Deprecation 1]
- [Deprecation 2]

### Removed

- [Removal 1]
- [Removal 2]

### Fixed

- [Bug fix 1]
- [Bug fix 2] -->

### [Version 1.3.7] 2024-03-20

### Added

- Added windowEvents to Canvas component

### [Version 1.3.6] 2024-03-18

### Fixed

- Refactored CanvasObject default state and props to 'any' type. Fixes type constraint issues with deeply nested object inheritance.

## [Version 1.3.5] 2024-03-15

### Added

- `Component` and `Entity` classes

### Changed

- Refactored the `Context` type ordering for CanvasObject and manager classes

## [Version 1.3.4] 2024-03-12

### Added

- `gridOffset` prop to `Canvas` component to allow control over the grid position (useful for zoom/scroll operations)

### Fixed

- `Canvas` component - context check before calling init

## [Version 1.3.3] 2024-03-11

### Added

- Added `onContextMenu` callback to prevent default

### Fixed

- `Canvas` component context initialization now handles falling back to `experimental-webgl`. Outputs console warn/error for failed initialization.

## [Version 1.3.2] 2024-03-11

### Fixed

- Refactored the `CanvasObject` and `ObjectManager` type generics, the default Context was still causing issues, so it is now the first Type argument, the CanvasObject type default is now built from this rather than relying on hard-coded defaults

## [Version 1.3.1] 2024-03-11

### Fixed

- Fixed an issue with the `CanvasObject` and `ObjectManager` class default context of Context2D, set to generic type of `CanvasContext` to correct issue when manually setting the context to anything else (ie. webgl)

- Fixed an issue with useEffect depedencies, event callbacks were missing event handlers, and update loop wasn't being cleared with frameRate changes

## [Version 1.3.0] 2024-03-10

### Changed

- Refactored the `CanvasObject`, `ObjectState`, `ObjectProps`, and `CanvasObjectManager` into a single namespace, now organized as:

  - `CanvasObject`
    - `Base` CanvasObject
    - `Manager` CanvasObjectManager
    - `State` ObjectState
    - `Props` ObjectProps

## [Version 1.2.9] 2024-03-09

### Added

- Utility function `rgbAngle` for making fun rainbow colors

### Changed

- Reduced the final package size with a `clean` stage to remove transpiled files

## [Version 1.2.8] 2024-03-09

### Added

- `documentEvents` callback for attaching event listeners at the document level

### Fixed

- canvas styles are now merged with those supplied to `Canvas` props - This fixes an issue where base styles were completely overriden.

## [Version 1.2.7] 2024-03-09

### Changed

- Updated `CanvasObject` and `CanvasObjectManager` (renamed to `ObjectManager`)

  - Renamed `args` to `props`
  - Removed `args` from `render()` method
  - Shortened Type names from `CanvasObject*` to `Object*`

- Wrapped update setInterval callback in min/max guards of 0.01 to 1000. Allows settings frameRate to 0 to pause update

## [Version 1.2.6] 2024-03-09

### Fixed

- Fixed an issue with type declarations being exported incorrectly by Typescript transpiler (Bug?)

## [Version 1.2.5] 2024-03-08

### Removed

- `tslib` dependency

## [Version 1.2.4] 2024-03-08

### Added

- `esbuild` configuration to bundle/minify build

### Changed

- Refactored type declarations

### Fixed

- Moved `tslib` from devDependencies into dependencies

## [Version 1.2.3] - 2024-03-08

### Added

- `hideCursor` boolean prop added to Canvas

### Changed

- `CanvasObject` and `CanvasObjectManager` now have more generic types added along with state and arg management

## [Version 1.2.2] - 2024-03-07

### Fixed

- Focus is now given to the canvas when fullscreen is `true`
