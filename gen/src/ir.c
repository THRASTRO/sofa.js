/* Generate Test Data for ir */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{

  printf("var ir_results = [\n");

  double res0[3][3] = {0};
  printf("  [");
  eraIr(res0);
  exportMAT33(res0);
  printf("  ],\n");


  printf("];\n");
}
