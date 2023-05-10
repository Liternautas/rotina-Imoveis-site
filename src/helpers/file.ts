export const blobToFile = async (path: string) => {
    let myFile = null;
    await fetch(path)
        .then((res) => res.blob())
        .then((myBlob) => {
            myFile = new File([myBlob], 'image.jpeg', {
                type: myBlob.type,
            });
        });
    return myFile;
}

export const downloadFile = async (path: string) => {
    const link = document.createElement('a');
    link.href = process.env.NEXT_PUBLIC_BASE_URL + path;
    link.setAttribute('download', 'file.pdf');
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
};

export const downloadFileToPath = async (path: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.setAttribute('download', 'file.pdf');
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
};