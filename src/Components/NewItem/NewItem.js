import React, { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
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
  const onSubmit = (data) => {
    const Id = uuidv4();
    data = { ...data, Id };
    console.log(data);
    // console.log(errors);
  };
  return (
    <div>
      {isOpen && (
        <div className="modal" role="dialog" id="my_modal_8">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="What item do you want to add?"
                {...register("Name", {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
              />
              {errors.Name?.type === "required" && (
                <p role="alert">Name is required</p>
              )}
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="How much does it cost?"
                {...register("Price", {
                  required: true,
                  pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                })}
              />
              {errors.Price?.type === "required" && (
                <p role="alert">Price is required</p>
              )}
              {errors.Price?.type === "pattern" && (
                <p role="alert">Please enter a valid price</p>
              )}
              <input
                type="url"
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
                <p role="alert">Image URL is required</p>
              )}
              {errors.ImageUrl?.type === "pattern" && (
                <p role="alert">Please enter a valid image URL</p>
              )}

              <select
                {...register("IsPopular", {
                  required: true,
                })}
                onChange={(e) =>
                  setValue("IsPopular", e.target.value === "yes")
                }
              >
                <option disabled selected>
                  Is it popular?
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <select
                {...register("IsRecommended", {
                  required: true,
                })}
                onChange={(e) =>
                  setValue("IsRecommended", e.target.value === "yes")
                }
              >
                <option disabled selected>
                  Do you recommend this?
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <input type="submit" />
            </form>
            <div className="modal-action">
              <button className="btn btn-ghost">Submit</button>
              <button onClick={closeModal} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewItem;
