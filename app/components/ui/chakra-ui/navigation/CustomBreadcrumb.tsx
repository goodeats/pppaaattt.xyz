import { Breadcrumb, BreadcrumbItem } from '~/components';

type CustomBreadcrumbProps = {
  breadcrumbs: JSX.Element[];
};

export const CustomBreadcrumb = ({ breadcrumbs }: CustomBreadcrumbProps) => {
  return (
    <Breadcrumb>
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem key={index}>{breadcrumb}</BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
