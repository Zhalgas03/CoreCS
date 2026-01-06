"use client"

import { useState } from "react"
import Cropper from "react-easy-crop"
import { getCroppedImg } from "../../lib/cropImage"
import { useSettingsUser } from "../components/SettingsUserContext"

export default function PhotoPage() {
  const ctx = useSettingsUser()

  /* ⬇️ ВСЕ useState — СРАЗУ */
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<any>(null)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  /* ⬇️ ПРОВЕРКИ ПОСЛЕ ХУКОВ */
  if (!ctx) {
    return <div className="p-5">Loading…</div>
  }

  const { user, refresh } = ctx

  if (!user) {
    return <div className="p-5">Loading…</div>
  }

  /* ---------- FILE SELECT ---------- */
  const onSelectFile = (file: File) => {
    setFile(file)
    setPreviewUrl(URL.createObjectURL(file))
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

      const res = await fetch("/api/auth/profile/avatar", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      await refresh()
      setPreviewUrl(null)
      setFile(null)
    } catch {
      setError("Upload failed")
    } finally {
      setSaving(false)
    }
  }

  /* ---------- UI ---------- */
  return (
    <>
      <div style={{ padding: "24px", borderBottom: "1px solid #d1d7dc" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>
          Photo
        </h1>
        <p>Add a nice photo of yourself for your profile.</p>
      </div>

      <div style={{ padding: 24, maxWidth: 650 }}>
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              width: 600,
              height: 300,
              background: "#f7f9fa",
              border: "1px solid #d1d7dc",
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
              <img
                src={user.avatarUrl}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}
          </div>
        </div>

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

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={e =>
            e.target.files && onSelectFile(e.target.files[0])
          }
        />

        <button
          className="btn btn-primary"
          disabled={!file || saving}
          onClick={save}
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
