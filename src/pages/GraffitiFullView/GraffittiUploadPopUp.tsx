import { Button, Dialog, DialogProps, Divider, IconButton, InputBase, Paper, TextField, Typography } from "@mui/material"
import GraffitiResponse from "models/graffiti/GraffitiResponse";
import { ChangeEvent, useEffect, useState } from "react";
import React from "react"
import GraffitiAPI from "api/GraffitiPostAPI";
import GraffitiPhotoRequest from "models/graffitiphoto/GraffitiPhotoRequest";
import GraffitiPhotoAPI from "api/GraffitiPhotoAPI";
import { FormikProps, FormikValues } from "formik/dist/types";
import IFile from "models/file/IFile";
import * as yup from "yup";
import { Formik } from "formik";
import { Directions, Search } from "@mui/icons-material";

interface popUpComponentProps extends DialogProps { }
const Styles = {
    color: "#ffffff"
}
const maxNumber = 6900000;


export default function PopUPComponent(props: popUpComponentProps) {
    const [graffitiPosts, setGraffitiPosts] = useState<GraffitiResponse[]>();
    const [images, setImages] = useState<FileList | null>();

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        let newFiles = event.target.files;
        setImages(newFiles);
        if (newFiles) {
            let url = URL.createObjectURL(newFiles[0]);
        }
    };

    const validationSchema = yup.object({
        file: yup
            .mixed()
            .nullable()
            .required("A file is required")
            .test(
                "fileSize",
                "File too large",
                (value) => value && value.size <= maxNumber
            ),
    });


    useEffect(() => {
        getGraffitiPosts();
    }, []);

    const onChange = (addUpdateIndex: number[] | undefined) => {
        // data for submit
    };

    const getGraffitiPosts = async () => {
        // let response = await GraffitiPostAPI.findAll();
        let response = await GraffitiAPI.findById(1);
        // setGraffitiPosts(response);
    };

    const onSubmit = async (values: FormikValues) => {
        let file = values.file;
        if (file) {
            let url = URL.createObjectURL(file);
            let formData = new FormData();
            formData.append("file", file);
            let filename = file.name;

            let iFile: IFile = {
                originalname: filename,
                buffer: file,
                mimetype: file.type,
            };

            let request: GraffitiPhotoRequest = {
                file: iFile,
                graffitiId: 1,
                addedAt: new Date(),
            };
            formData.append("body", JSON.stringify(request));

            let response = await GraffitiPhotoAPI.create(formData);
            console.log("response: ", response);
        }
    };

    return (
        <Dialog
            PaperProps={{
                style: {
                    background: '#404044',
                    width: '100vw'
                }
            }}
            open={props.open} onClose={props.onClose}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "24px",
                    height: "100%",
                    gap: "8px",
                }}
            >
                <div>
                    <Typography
                        color="common.white"
                        sx={{
                            mb: "12px",
                            fontFamily: "Times, Times New Roman, serif",
                        }}
                    >
                        Enter the name of the graffiti
                    </Typography>
                    <TextField
                        id="outlined-multiline-flexible demo-helper-text-misaligned-
					no-helper"
                        fullWidth
                        multiline
                        label="Name"
                        variant="outlined"
                        inputProps={{ style: { color: "white" } }}
                        sx={{
                            "& .MuiInputLabel-root": { color: "white" },
                            "& .MuiFilledInput-input": {
                                border: "1px solid white",
                                borderRadius: 1,
                            },
                        }}
                    />
                    <Typography
                        color="common.white"
                        sx={{
                            mt: "12px",
                            mb: "12px",
                            fontFamily: "Times, Times New Roman, serif",
                        }}
                    >
                        Enter a short description
                    </Typography>
                    <TextField
                        id="outlined-multiline-flexible demo-helper-text-misaligned-
					no-helper"
                        fullWidth
                        multiline
                        label="Description"
                        variant="outlined"
                        inputProps={{ style: { color: "white" } }}
                        sx={{
                            "& .MuiInputLabel-root": { color: "white" },
                            "& .MuiFilledInput-input": {
                                border: "1px solid white",
                                borderRadius: 1,
                            },
                        }}
                    />
                    <Typography
                        color="common.white"
                        sx={{
                            mt: "12px",
                            mb: "12px",
                            fontFamily: "Times, Times New Roman, serif",
                        }}
                    >
                        Enter an address of the graffiti
                    </Typography>
                    <Paper
                        component="form"
                        sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            width: 400,
                            mb: "12px",
                            fontFamily: "Times, Times New Roman, serif",
                        }}
                    >
                        <InputBase
                            sx={{ ml: 5, flex: 1, fontFamily: "Times, Times New Roman, serif" }}
                            placeholder="Search Google Maps"
                            inputProps={{ "aria-label": "search google maps" }}
                        />
                        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                            <Search />
                        </IconButton>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton
                            color="primary"
                            sx={{ p: "10px" }}
                            aria-label="directions"
                        >
                            <Directions />
                        </IconButton>
                    </Paper>
                </div>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        file: null,
                    }}
                    onSubmit={onSubmit}
                    npx
                >
                    {(formik: FormikProps<any>) => (
                        <>
                            <label className="drop-container">
                                <span className="drop-title">Drop files here</span>
                                or
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={(event) => {
                                        if (event.currentTarget.files) {
                                            formik.setFieldValue("file", event.currentTarget.files[0]);
                                        } else {
                                            formik.setFieldValue("file", null);
                                        }
                                    }}
                                />
                            </label>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={() => {
                                    onSubmit(formik.values);
                                }}
                            >
                                Submit
                            </Button>
                        </>
                    )}
                </Formik>
                {images &&
                    Array.from(images).map((image) => (
                        <div key={image.name}>
                            <img src={URL.createObjectURL(image)} alt={image.name} />
                        </div>
                    ))}
            </div>
        </Dialog>
    )
}