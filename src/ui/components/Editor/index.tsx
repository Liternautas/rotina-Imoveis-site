import { useEffect, useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { getImageUrl } from '@/src/helpers/functions';
import { api } from '@/src/services/api';

export function Editor({ content, onChange }) {
    const editorRef = useRef(null);
    const [view, setView] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        editorRef?.current?.setContent(content);
        //setValue(content);
    }, [content]);

    return (
        <>
            {!view && <span>Carregando editor...</span>}
            {/* @ts-ignore */}
            <TinyMCEEditor
                onInit={(evt, editor) => {
                    editorRef.current = editor;
                    setValue(editor.getContent());
                    setView(true);
                }}
                onBlur={() => onChange(value)}
                initialValue={content}
                apiKey="fiefp1tg97t4rmeakiloziruzzz7ihsl5v0wutawq462rzzb" // Obtenha uma chave API gratuita em https://www.tiny.cloud/
                init={{
                    plugins: 'preview code importcss tinydrive searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
                    mobile: {
                        plugins: 'preview importcss tinydrive searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
                    },
                    menu: {
                        tc: {
                            title: 'Comments',
                            items: 'addcomment showcomments deleteallconversations'
                        }
                    },
                    menubar: 'file edit view insert format tools table tc help',
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment | code',
                    autosave_ask_before_unload: true,
                    autosave_interval: '30s',
                    autosave_prefix: '{path}{query}-{id}-',
                    autosave_restore_when_empty: false,
                    autosave_retention: '2m',
                    image_advtab: true,
                    link_list: [
                        { title: 'My page 1', value: 'https://www.tiny.cloud' },
                        { title: 'My page 2', value: 'http://www.moxiecode.com' }
                    ],
                    image_list: [
                        { title: 'My page 1', value: 'https://www.tiny.cloud' },
                        { title: 'My page 2', value: 'http://www.moxiecode.com' }
                    ],
                    image_class_list: [
                        { title: 'None', value: '' },
                        { title: 'Some class', value: 'class-name' }
                    ],
                    importcss_append: true,
                    height: 600,
                    image_caption: true,
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    noneditable_noneditable_class: 'mceNonEditable',
                    toolbar_mode: 'sliding',
                    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
                    tinycomments_mode: 'embedded',
                    content_style: '.mymention{ color: gray; }',
                    contextmenu: 'link image imagetools table configurepermanentpen',
                    a11y_advanced_options: true,
                    mentions_item_type: 'profile',
                    images_upload_url: 'http://localhost:8080/upload-image',
                    images_upload_handler: async (blob, progress) => {
                        const formData = new FormData();
                        formData.append('file', blob.blob(), blob.filename());

                        const res = await api.patch('upload-image', formData);
                        return getImageUrl(res.data.path);
                    }
                }}
                onEditorChange={(value, editor) => {
                    const content = editor.getContent();
                    setValue(content);
                }
                }
            />
        </>
    );
}

export default TinyMCEEditor;