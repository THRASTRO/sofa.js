/* Generate Test Data for rv2m */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3];
  printf("var rv2m_results = [\n");
  for (t0[0] = -0.04124432; t0[0] <= 0.04124432; t0[0] += 0.03093324) {
  for (t0[1] = -0.04124432; t0[1] <= 0.04124432; t0[1] += 0.03093324) {
  for (t0[2] = -0.04124432; t0[2] <= 0.04124432; t0[2] += 0.03093324) {

    double res0[3][3] = {0};
    printf("  [");
    exportV3(t0);
    printf(", ");
    eraRv2m(t0, res0);
    exportMAT33(res0);
    printf("  ],\n");

  }
  }
  }

  printf("];\n");
}
