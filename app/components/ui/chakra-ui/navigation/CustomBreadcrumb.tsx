import { NavLink } from '@remix-run/react';
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '~/components';

// TODO: take logic out from dashboard for breadcrumbs
// app/routes/dashboard+/_dashboard.tsx

export const CustomBreadcrumb = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to="#">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to="#">
          About
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>Contact</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
