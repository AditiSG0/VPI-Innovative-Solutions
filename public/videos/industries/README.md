# Industry hero video assets

The industry pages are mapped to the four MP4 files supplied by the project owner:

| Industry page | Expected public URL | Uploaded file |
|---|---|---|
| Aerospace | `/Industries/14256007_2560_1440_30fps.mp4` | `14256007_2560_1440_30fps.mp4` |
| Electronics | `/Industries/4709394-uhd_4096_2160_25fps.mp4` | `4709394-uhd_4096_2160_25fps.mp4` |
| Automobile | `/Industries/6450803-hd_1920_1080_25fps.mp4` | `6450803-hd_1920_1080_25fps.mp4` |
| Medical | `/Industries/8381327-uhd_3840_2160_25fps.mp4` | `8381327-uhd_3840_2160_25fps.mp4` |

The video files were uploaded under `public/Industries/` on the repository's `main` branch. For the feature-branch preview to serve these URLs, the same four binary files must also exist under `public/Industries/` on `vpi-industry-video-editorial`. The website code changes remain isolated to that feature branch.

## Production recommendations

- Keep videos muted, autoplaying, looping and inline, with a poster fallback.
- Prefer H.264 MP4 at 24–30 fps and optimise large 4K files for web delivery.
- Inspect clips for third-party logos, trademarks and identifiable people before publication.
- Retain source and licence details with the assets.
