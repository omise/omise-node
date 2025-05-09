# Change Log
All notable changes to omise-node project will be documented in this file.
Use [Semantic Versioning](http://semver.org/).

## 1.0.0 - 2025-04-23
- Fix warning from nyc package. [(#219)](https://github.com/omise/omise-node/pull/219)
- Upgrade omise-node api to v2019 [(#220)](https://github.com/omise/omise-node/pull/220)
- Add support for merchant advice and missing 3ds fields [(#223)](https://github.com/omise/omise-node/pull/223)

## 0.12.1 - 2024-05-23
- Status added to ICharge interface. [(#213)](https://github.com/omise/omise-node/pull/213)

## 0.12.0 - 2023-10-24
- Added support for dynamic webhook [(#207)](https://github.com/omise/omise-node/pull/207)
- Updated api version in readme [(#205)](https://github.com/omise/omise-node/pull/205)

## 0.11.0 - 2023-09-11
- Added support for partial capture [(#203)](https://github.com/omise/omise-node/pull/203)

## 0.10.1 - 2023-04-20
- Fixed Next.js build issue [(#190)](https://github.com/omise/omise-node/pull/190)

## 0.10.0 - 2023-03-21
- Fixed security risk on logging [(#185)](https://github.com/omise/omise-node/pull/185)
- Fixed sonarcloud issue [(#184)](https://github.com/omise/omise-node/pull/184)
- Added coding standard and replace bluebird with build in promise [(#183)](https://github.com/omise/omise-node/pull/183)

## 0.9.0 - 2023-02-21
- Add support scheme in config [(#175)](https://github.com/omise/omise-node/pull/175)
- Add support host in config [(#169)](https://github.com/omise/omise-node/pull/169)

## 0.8.5 - 2020-12-24
- Add `phone_number` in source params (#147).
- Fix authentication for customer schedules (#143).

## 0.8.4 - 2020-11-10
- Fix GET/DELETE requests contain request body.

## 0.8.3 - 2020-08-13
- Add destroy method TS definition for Schedules API

## 0.8.2 - 2020-07-23
- Add missing typescript definitions.

## 0.8.1 - 2020-07-20
- Add `Charge.expire` API.

## 0.8.0 - 2020-07-08
- Add `Account.update` API.

## 0.7.1 - 2020-05-15
- Fix typo.

## 0.7.0 - 2020-05-15
- Add support of capability API.

## 0.5.2 - 2016-05-12
- Support for Charge reverse api.

## 0.5.1 - 2016-04-22
- Add listCard([,data]) option.

## 0.5.0 - 2016-02-18
- Add Events API support.

## 0.4.1 - 2016-01-07
- Update list() doc.

## 0.4.0 - 2016-01-04
- Fix list pagination.

## 0.3.0 - 2015-11-13
- Add `omiseVersion` config that support adding `Omise-Version` http header to the api request.
- Improve test by cleaning up unused vars.

## 0.2.1 - 2015-06-10
### Removed
- Remove token creation example.

### Added
- Add handling card data information.

## 0.2.0 - 2015-06-02
### Added
- Add Recipients API support.
- Add Disputes API support.

## 0.1.2 - 2015-05-28
### Fixed
- Fixed remote tests.

## 0.1.1 - 2015-03-06
### Added
- This CHANGELOG file.

[unreleased]: https://github.com/omise/omise-node/commits/master
[0.7.0]: https://github.com/omise/omise-node/releases/tag/v0.7.0
[0.5.2]: https://github.com/omise/omise-node/releases/tag/v0.5.2
[0.5.2]: https://github.com/omise/omise-node/releases/tag/v0.5.2
[0.5.1]: https://github.com/omise/omise-node/releases/tag/v0.5.1
[0.5.0]: https://github.com/omise/omise-node/releases/tag/v0.5.0
[0.4.1]: https://github.com/omise/omise-node/releases/tag/v0.4.1
[0.4.0]: https://github.com/omise/omise-node/releases/tag/v0.4.0
[0.3.0]: https://github.com/omise/omise-node/releases/tag/v0.3.0
[0.2.1]: https://github.com/omise/omise-node/releases/tag/v0.2.1
[0.2.0]: https://github.com/omise/omise-node/releases/tag/v0.2.0
[0.1.2]: https://github.com/omise/omise-node/releases/tag/v0.1.2
[0.1.1]: https://github.com/omise/omise-node/releases/tag/v0.1.1
[0.1.0]: https://github.com/omise/omise-node/releases/tag/v0.1.0
