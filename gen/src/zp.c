/* Generate Test Data for zp */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{

  printf("var zp_results = [\n");

  double res0[3] = {0};
  printf("  [");
  iauZp(res0);
  exportV3(res0);
  printf("  ],\n");


  printf("];\n");
}
