import { Formik, Form, Field } from "formik";
import React from "react";
import { object, string, TypeOf } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const contactFormSchema = object({
  // defines a required field called name
  name: string({
    required_error: "Please enter your name",
  }),
  // defines a required field called email.
  // we use the built-in email validator from zod
  email: string().email("Please enter a valid email"),
  // defines a required field called message with length constrains of 150-1000 characters.
  message: string().min(150).max(1000),
});

// Get the infered input type from the schema using TypeOf
type ContactFormInputs = TypeOf<typeof contactFormSchema>;

const ContactForm = () => {
  return (
    <Formik<ContactFormInputs>
      initialValues={{
        name: "",
        email: "",
        message: "",
      }}
      onSubmit={(values) => {
        // call api
        console.log("Form is submitted");
      }}
      validationSchema={toFormikValidationSchema(contactFormSchema)}
    >
      {(formikState) => {
        const errors = formikState.errors;
        return (
          <div className="card shadow-md">
            <Form className="card-body">
              <div className="card-title">Contact Us</div>
              <div className="flex space-between gap-2">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Your name</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="e.g. John Doe"
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text text-error">
                        {errors.name}
                      </span>
                    </label>
                  )}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Your email</span>
                  </label>
                  {/* use the Field component instead of input we leave all props as is */}
                  {/* note that the name property should match the formik initialValues */}
                  <Field
                    type="text"
                    name="email"
                    placeholder="e.g johndoe@gmail.com"
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text text-error">
                        {errors.email}
                      </span>
                    </label>
                  )}
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your message</span>
                </label>
                {/* use as property to transform the field into a textarea */}
                <Field
                  as="textarea"
                  type="text"
                  name="message"
                  className="textarea textarea-bordered h-24"
                  placeholder="Message"
                />
                {errors.message && (
                  <label className="label">
                    <span className="label-text text-error">
                      {errors.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default ContactForm;
