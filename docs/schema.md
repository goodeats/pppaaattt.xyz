# Project Schema Documentation

## Overview

This document provides an overview of the database schema used in our project. The schema is designed to support a design system that involves hierarchical layers and design attributes, each potentially influenced by various input parameters.

## Schema Description

### Models

#### Layer

- Represents individual layers in a design.
- Supports a hierarchical structure, allowing layers to have parent-child relationships.
- The root layer (main node) has no parent.
- Layers are associated with design attributes.
  Child layers can override attributes inherited from parent layers.

#### DesignAttribute

- Represents a specific design property (e.g., color, size).
- Linked to layers; each layer can have multiple design attributes.
- Attributes are categorized by AttributeType.
- Filter attributes have an additional sub-type defined by FilterType.
- Linked to InputParameter through a many-to-many relationship.

#### InputParameter

- Defines how values for design attributes are determined.
- Supports types like 'explicit', 'random', and 'range'.
- Each input parameter can be linked to multiple design attributes, forming a many-to-many relationship.

### Enums

#### AttributeType

- Enum for main types of design attributes (e.g., container, palette, position).

#### FilterType

- Enum for filter sub-types, applicable only if the main attribute type is 'filter'.

#### InputType

- Enum for types of input parameters (explicit, random, range).

### Relationships

- **Layer Hierarchy**: Layers have a parent-child relationship, allowing for a hierarchical structure in designs.
- **Layer to DesignAttribute**: One-to-many relationship. Each layer can have multiple design attributes.
- **DesignAttribute to InputParameter**: Many-to-many relationship. Each design attribute can be linked to multiple input parameters and vice versa.

### Fields

- Common fields like `id`, `createdAt`, and `updatedAt` are present in all models for identification and tracking.
- Specific fields in `DesignAttribute` and `InputParameter` cater to the flexibility and specificity of design properties and their input mechanisms.

## Additional Notes

- **Cascade Deletes**: The schema should handle cascade deletes appropriately, especially in parent-child relationships within the Layer model.
- **Validation and Constraints**: Fields have validations where necessary to ensure data integrity.
- **Indexes**: Indexes are used to improve query performance, especially on frequently queried fields.
- **Scalability**: The schema is designed with scalability in mind, accommodating potential growth in data volume and complexity.
