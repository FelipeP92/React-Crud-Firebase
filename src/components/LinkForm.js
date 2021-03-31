
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";






export const LinkForm = (props) => {

    const initialStateValues = {
        url: "",
        name: "",
        description: ""
    };

    const [values, setValues] = useState(initialStateValues);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })


    };

    const validURL = (str) => {
        var pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
            "i"
        ); // fragment locator
        return !!pattern.test(str);
    };




    const hundleSubmit = (e) => {
        e.preventDefault();

        if (!validURL(values.url)) {
            return toast("invalid url", { type: "warning", autoClose: 1000 });
        }

        props.addOrEditLink(values);
        setValues({ ...initialStateValues })

    };

    const getElementById = async (id) => {
        const doc = await db.collection("links").doc(id).get();
        setValues({ ...doc.data() })
    };

    useEffect(() => {
        if (props.currentId === "") {
            setValues({ ...initialStateValues });

        } else {
            getElementById(props.currentId);
        }
    }, [props.currentId]);



    return (
        <form className="card card-body border-primary" onSubmit={hundleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons text-white">insert_link</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="https://"
                    name="url"
                    onChange={handleInputChange}
                    value={values.url}
                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons text-white">create</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Website"
                    name="name"
                    onChange={handleInputChange}
                    value={values.name}
                />
            </div>

            <div className="form-group">
                <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Description"
                    onChange={handleInputChange}
                    value={values.description}
                >
                </textarea>
            </div>

            <button className="btn btn-info btn-block">
                {props.currentId === "" ? "Save" : "Update"}
            </button>
        </form>
    )
}