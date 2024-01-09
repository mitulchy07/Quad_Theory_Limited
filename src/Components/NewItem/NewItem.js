import React, { useEffect, useState } from "react";
import data from "../../data.json";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const NewItem = ({ isOpen, setIsOpen }) => {
  const closeModal = () => setIsOpen(false);
  const [value, setValue] = useState("true");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitData, setSubmitData] = useState(null);

  const onSubmit = (data) => {
    const Id = uuidv4();
    data = { ...data, Id };
    setSubmitData(data);
  };
  
  useEffect(() => {
    if (submitData) {
      fetch(data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [submitData]);
  return (
    <div>
      {isOpen && (
        <div className="modal" role="dialog" id="my_modal_8">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="input input-bordered w-full mb-2"
                placeholder="What item do you want to add?"
                {...register("Name", {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
              />
              {errors.Name?.type === "required" && (
                <p className="text-red-600 mb-2" role="alert">Name is required</p>
              )}
              <input
                type="number"
                className="input input-bordered w-full mb-2"
                step="0.01"
                min="0"
                placeholder="How much does it cost?"
                {...register("Price", {
                  required: true,
                  pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                })}
              />
              {errors.Price?.type === "required" && (
                <p className="text-red-600 mb-2"  role="alert">Price is required</p>
              )}
              {errors.Price?.type === "pattern" && (
                <p className="text-red-600 mb-2" role="alert">Please enter a valid price</p>
              )}
              <input
                type="url"
                className="input input-bordered w-full mb-2"
                placeholder="Please enter an image URL"
                defaultValue="http://"
                {...register("ImageUrl", {
                  required: true,
                  pattern: /^(ftp|http|https):\/\/[^ "]+$/,
                })}
                autoComplete="on"
                autoFocus
              />
              {errors.ImageUrl?.type === "required" && (
                <p className="text-red-600 mb-2" role="alert">Image URL is required</p>
              )}
              {errors.ImageUrl?.type === "pattern" && (
                <p className="text-red-600 mb-2" role="alert">Please enter a valid image URL</p>
              )}

              <select
              className="input input-bordered w-full mb-2"
                {...register("IsPopular", {
                  required: true,
                })}
                onChange={(e) =>
                  setValue("IsPopular", e.target.value === "yes")
                }
              >
                <option value="true" disabled selected>
                  Is it popular?
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <select
              className="input input-bordered w-full mb-2"
                {...register("IsRecommended", {
                  required: true,
                })}
                onChange={(e) =>
                  setValue("IsRecommended", e.target.value === "yes")
                }
              >
                <option value="true" disabled selected>
                  Do you recommend this?
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <div className="modal-action">
              <button type="submit" className="btn btn-ghost">Submit</button>
              <button onClick={closeModal} className="btn">
                Close
              </button>
            </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewItem;
