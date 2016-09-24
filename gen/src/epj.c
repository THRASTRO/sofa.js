/* Generate Test Data for epj */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  printf("var epj_results = [\n");
  for (t0 = 0.0 - 36.0 * 5.0; t0 <= 0.0 + 36.0 * 5.0; t0 += 36.0) {
    for (t1 = 0.0 - 36.0 * 5.0; t1 <= 0.0 + 36.0 * 5.0; t1 += 36.0) {


      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      printf("%.28e", iauEpj(t0, t1));
      printf("  ],\n");

    }
  }

  printf("];\n");
}
