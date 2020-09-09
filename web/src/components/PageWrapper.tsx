import React from "react";
import {Box} from "@chakra-ui/core";

interface PageWrapperProps {
  variant?: 'small' | 'regular'
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, variant = 'regular' }) => {

  const maxWidth = variant === 'regular' ? '800px' : '400px';

  return <Box mt={8} mx="auto"  maxW={maxWidth} w="100%">{children}</Box>
}

export default PageWrapper;