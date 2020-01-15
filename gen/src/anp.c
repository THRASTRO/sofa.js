/* Generate Test Data for anp */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  printf("var anp_results = [\n");
  for (t0 = - 10000; t0 <= + 10000; t0 += 10000 / 32.0) {


    printf("  [");
    printf("%.28e", t0);
    printf(", ");
    printf("%.28e", eraAnp(t0));
    printf("  ],\n");

  }

  printf("];\n");
}
