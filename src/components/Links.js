import { useEffect, useState } from "react";
import { LinkForm } from "./LinkForm";
import { toast } from "react-toastify";

import { db } from "../firebase";

export const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState("")



    const addOrEditLink = async (linkObjetc) => {
        try {
            if (currentId === "") {
                await db.collection("links").doc().set(linkObjetc);
                toast("New link added", {
                    type: "success",
                    autoClose: 1500
                })
            } else {
                await db.collection("links").doc(currentId).update(linkObjetc);
                toast("Link updated", {
                    type: "info",
                    autoClose: 1500
                });

                setCurrentId("")

            }

        } catch (error) {
            console.error(error);
        }
    };

    const onDeleteLink = async (id) => {
        if (window.confirm("Are you sure of delete link?")) {
            await db.collection("links").doc(id).delete();
            toast("Link delete", {
                type: "error",
                autoClose: 1500
            })
        }
    }

    const getLinks = async () => {

        db.collection("links").onSnapshot((querySnapShot) => {
            const docs = [];
            querySnapShot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);

        });

    }

    useEffect(() => {
        getLinks();
    }, [])


    return (
        <div>
            <div className="col-md-4 p-2">
                <LinkForm {...{ addOrEditLink, currentId, links }} />
            </div>
            <div className="col-md-8 p-2">
                {links.map((link) => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i
                                        className="material-icons"
                                        onClick={() => setCurrentId(link.id)}
                                    >
                                        create
                                    </i>
                                    <i
                                        className="material-icons text-danger"
                                        onClick={() => onDeleteLink(link.id)}
                                    >
                                        close
                                    </i>

                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noreferrer">Go to Website</a>

                        </div>
                    </div>
                ))}
            </div>

        </div>

    )

}

