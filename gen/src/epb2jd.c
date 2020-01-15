/* Generate Test Data for epb2jd */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  printf("var epb2jd_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {

    double res0 = {0};
    double res1 = {0};
    printf("  [");
    printf("%.28e", t0);
    printf(", ");
    eraEpb2jd(t0, &res0, &res1);
    printf("%.28e", res0);
    printf(", ");
    printf("%.28e", res1);
    printf("  ],\n");

  }

  printf("];\n");
}
