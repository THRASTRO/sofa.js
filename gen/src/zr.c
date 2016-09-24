/* Generate Test Data for zr */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{

  printf("var zr_results = [\n");

  double res0[3][3] = {0};
  printf("  [");
  iauZr(res0);
  exportMAT33(res0);
  printf("  ],\n");


  printf("];\n");
}
