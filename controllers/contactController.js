const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Contact = require("../models/contactModel")

const getContacts = asyncHandler(async(request, response) => {
  const contacts = await Contact.find();
  response.status(200).json(contacts)
});

const createContact = asyncHandler(async (request, response) => {
  const { name, email, mobileno } = request.body;
  if (!name || !email || !mobileno) {
    response.status(400);
    throw new Error("All Fields are Mandatory!");
  }

  const contact = await Contact.create({ name, email, phone: mobileno }); // Corrected line
  response.status(201).json(contact);
});

const getContact = asyncHandler(async(request, response) => {
  const { id } = request.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    response.status(404)
    throw new Error("Contact Not Found")
  }
  response.status(200).json(contact);
})

const updateContact = asyncHandler(async(request, response) => {
  const { id } = request.params;
  const contact = await Contact.findById(id);
  
  if (!contact) {
    response.status(404);
    throw new Error("Contact not found")
  }
  const updatedContact = await Contact.findByIdAndUpdate(id, request.body, { new: true });

  response.status(200).json(updatedContact)
});

const deleteContact = asyncHandler(async(request, response) => {
  const { id } = request.params;
  const contact = await Contact.findById(id);

  if(!contact) {
    response.status(404)
    throw new Error("Contact not found")
  }
  await Contact.findByIdAndDelete(id);
  response.status(200).json({message: "The Contact has been deleted"});
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  updateContact,
  deleteContact,
  getContact
};