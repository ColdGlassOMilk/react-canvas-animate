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
