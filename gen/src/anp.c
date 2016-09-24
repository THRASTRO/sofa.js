/* Generate Test Data for anp */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  printf("var anp_results = [\n");
  for (t0 = - 10000; t0 <= + 10000; t0 += 10000 / 24.0) {


    printf("  [");
    printf("%.28e", t0);
    printf(", ");
    printf("%.28e", iauAnp(t0));
    printf("  ],\n");

  }

  printf("];\n");
}
