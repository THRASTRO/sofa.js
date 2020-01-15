/* Generate Test Data for ltecm */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  printf("var ltecm_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {

    double res0[3][3] = {0};
    printf("  [");
    printf("%.28e", t0);
    printf(", ");
    eraLtecm(t0, res0);
    exportMAT33(res0);
    printf("  ],\n");

  }

  printf("];\n");
}
