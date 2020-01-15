/* Generate Test Data for eform */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  int t0;
  printf("var eform_results = [\n");
  for (t0 = -7; t0 <= 5; t0 += 3) {

    double res0 = {0};
    double res1 = {0};
    printf("  [");
    printf("%d", t0);
    printf(", ");
    printf("%d", eraEform(t0, &res0, &res1));
    printf(", ");
    printf("%.28e", res0);
    printf(", ");
    printf("%.28e", res1);
    printf("  ],\n");

  }

  printf("];\n");
}
