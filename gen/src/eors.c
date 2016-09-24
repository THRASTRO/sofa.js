/* Generate Test Data for eors */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3][3];
  double _t0[3][3];
  double t1;
  unsigned long long modulo = 0;
  printf("var eors_results = [\n");
  long mod0 = 0;
  for (_t0[0][0] = 0; _t0[0][0] <= 1; _t0[0][0] += 1) {
  for (_t0[0][1] = 0; _t0[0][1] <= 1; _t0[0][1] += 1) {
  for (_t0[0][2] = 0; _t0[0][2] <= 1; _t0[0][2] += 1) {
  for (_t0[1][0] = 0; _t0[1][0] <= 1; _t0[1][0] += 1) {
  for (_t0[1][1] = 0; _t0[1][1] <= 1; _t0[1][1] += 1) {
  for (_t0[1][2] = 0; _t0[1][2] <= 1; _t0[1][2] += 1) {
  for (_t0[2][0] = 0; _t0[2][0] <= 1; _t0[2][0] += 1) {
  for (_t0[2][1] = 0; _t0[2][1] <= 1; _t0[2][1] += 1) {
  for (_t0[2][2] = 0; _t0[2][2] <= 1; _t0[2][2] += 1) {
    mod0 ++;
    if (mod0 > 1728) mod0 = 0;
    if (mod0 != 1) continue;
    for (t1 = -12; t1 <= 12; t1 += 3.75) {


      modulo = modulo > 4
        ? 0 : modulo + 1;
      if (modulo != 1) continue;
    memcpy(&t0, &_t0, sizeof t0);
      printf("  [");
      exportMAT33(t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      printf("%.28e", iauEors(t0, t1));
      printf("  ],\n");

    }
  }
  }
  }
  }
  }
  }
  }
  }
  }

  printf("];\n");
}
