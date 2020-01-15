/* Generate Test Data for ltpecl */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  printf("var ltpecl_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {

    double res0[3] = {0};
    printf("  [");
    printf("%.28e", t0);
    printf(", ");
    eraLtpecl(t0, res0);
    exportV3(res0);
    printf("  ],\n");

  }

  printf("];\n");
}
