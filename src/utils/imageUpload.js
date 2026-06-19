export const imageUpload = async (image) => {
  if (!image) return null;

  const formData = new FormData();
  formData.append("image", image);

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data?.data?.url; // সরাসরি ইমেজের আসল URL টি রিটার্ন করবে
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    return null;
  }
};