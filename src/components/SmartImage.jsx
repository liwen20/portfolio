import { useState } from 'react'

/**
 * SmartImage — 优化图片加载体验
 * 1. 固定宽高比容器，避免图片加载导致的布局抖动（CLS）
 * 2. 加载前显示骨架占位（脉冲动画），消除空白跳跃感
 * 3. 图片加载完成后淡入（对应 saaam.pw 的视觉丝滑过渡）
 * 4. 默认 lazy + async 解码，非首屏不占用带宽
 */
export default function SmartImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  aspectRatio,
  eager = false,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-white/5 ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* 骨架占位：图片未加载时显示 */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
      )}
      {!error && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...rest}
        />
      )}
    </div>
  )
}
