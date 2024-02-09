import toast from "react-hot-toast";

export async function upload (ev, callbackFunc) {
  const file1 = ev.target.files?.[0];
  // console.log(file)

  if (file1) {
    const uploadPromise = new Promise((resolve, reject) => {
      const data = new FormData();
      data.set("file", file1);
      // console.log(data);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          response.json().then((link) => {
            // console.log(link);
            callbackFunc(link);
            resolve(link);
          });
        } else {
          reject();
        }
      });
    });

    await toast.promise(uploadPromise, {
      loading: "Uploading....",
      success: "Uploaded !!",
      error: "Upload error !",
    });
  }
};
