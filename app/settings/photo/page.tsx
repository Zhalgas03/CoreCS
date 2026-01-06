"use client"

import { useState } from "react"
import Cropper from "react-easy-crop"
import { getCroppedImg } from "../../lib/cropImage"
import { useSettingsUser } from "../components/SettingsUserContext"

/* ---------- PAGE ---------- */

export default function PhotoPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<any>(null)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const { user, refresh } = useSettingsUser()
  if (!user) return <div className="p-5">Loading…</div>

  /* ---------- FILE SELECT ---------- */

  const onSelectFile = (file: File) => {
    setFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  /* ---------- CROP ---------- */

  const onCropComplete = (_: any, areaPixels: any) => {
    setCroppedAreaPixels(areaPixels)
  }

  /* ---------- SAVE ---------- */

  const save = async () => {
    if (!previewUrl || !croppedAreaPixels) return

    setSaving(true)
    setError("")

    try {
      const croppedBlob = await getCroppedImg(
        previewUrl,
        croppedAreaPixels
      )

      const formData = new FormData()
      formData.append("file", croppedBlob, "avatar.jpg")

      await fetch("/api/auth/profile/avatar", {
        method: "POST",
        body: formData, // ✅ cookie уйдёт автоматически
      })

      await refresh()

      setPreviewUrl(null)
      setFile(null)
    } catch {
      setError("Upload failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      {/* HEADER */}
      <div
        style={{
          padding: "24px 24px",
          borderBottom: "1px solid #d1d7dc",
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 4,
            color: "#24292f",
          }}
        >
          Photo
        </h1>
        <p style={{ color: "#6a6f73", margin: 0 }}>
          Add a nice photo of yourself for your profile.
        </p>
      </div>

      {/* CONTENT */}
      <div style={{ padding: 24, maxWidth: 650 }}>
        {/* PREVIEW / CROPPER */}
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 600,
              height: 300,
              background: "#f7f9fa",
              border: "1px solid #d1d7dc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {previewUrl ? (
              <Cropper
                image={previewUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            ) : user.avatarUrl ? (
              <div
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <img
                  src={user.avatarUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* ZOOM */}
        {previewUrl && (
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            style={{ width: "100%", marginBottom: 24 }}
          />
        )}

        {/* FILE INPUT */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              fontWeight: 700,
              display: "block",
              marginBottom: 8,
              color: "#24292f",
            }}
          >
            Add / Change Image
          </label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={e =>
              e.target.files && onSelectFile(e.target.files[0])
            }
          />
        </div>

        {/* SAVE */}
        <button
          className="btn btn-primary"
          disabled={!file || saving}
          onClick={save}
          style={{ fontWeight: 600, padding: "6px 20px" }}
        >
          {saving ? "Saving…" : "Save"}
        </button>

        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}
      </div>
    </>
  )
}
